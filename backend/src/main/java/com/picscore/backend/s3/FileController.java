package com.picscore.backend.s3;

import com.picscore.backend.common.model.response.BaseResponse;
import com.picscore.backend.photo.model.request.UploadPhotoRequest;
import com.picscore.backend.user.model.entity.User;
import com.picscore.backend.user.repository.UserRepository;
import com.picscore.backend.user.service.OAuthService;
import io.jsonwebtoken.impl.security.EdwardsCurve;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/files")
@RequiredArgsConstructor
public class FileController {

    private static final Logger log = LoggerFactory.getLogger(FileController.class);
    private final S3Service s3Service;
    private final OAuthService oAuthService;
    private final UserRepository userRepository;

    // 분석 요청
    @PostMapping("/analysis")
    public ResponseEntity<BaseResponse<Object>> analysisFile(@RequestBody UploadFileRequest payload) {
        return s3Service.analysisFile(payload.getImageUrl());
    }

    // 임시저장
    @PostMapping("/upload")
    public ResponseEntity<BaseResponse<UploadFileResponse>> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        return s3Service.uploadFile(file);
    }

    // 영구저장
    @PostMapping("/save")
    public ResponseEntity<BaseResponse<HttpStatus>> uploadFile(HttpServletRequest request, @RequestBody UploadFileRequest payload) {
        // 토큰에서 사용자 정보 추출
        Long userId = oAuthService.findIdByNickName(request);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 유저 없음; " + userId));

        return s3Service.saveFile(
                user,
                payload.getImageUrl(),
                payload.getImageName(),
                payload.getScore(),
                payload.getAnalysisChart(),
                payload.getAnalysisText(),
                payload.getIsPublic()
        );
    }
    
    @GetMapping("/download/{fileName}")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable String fileName) {
        byte[] data = s3Service.downloadFile(fileName);
        ByteArrayResource resource = new ByteArrayResource(data);
        
        return ResponseEntity
                .ok()
                .contentLength(data.length)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .body(resource);
    }
    
    @DeleteMapping("/delete/{fileName}")
    public ResponseEntity<String> deleteFile(@PathVariable String fileName) {
        try {
            s3Service.deleteFile(fileName);
            return ResponseEntity.ok("파일 삭제 성공");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("파일 삭제 실패: " + e.getMessage());
        }
    }
    
    @GetMapping("/list")
    public ResponseEntity<List<String>> listFiles() {
        return ResponseEntity.ok(s3Service.listFiles());
    }
}
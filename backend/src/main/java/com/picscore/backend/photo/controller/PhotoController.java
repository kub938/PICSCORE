package com.picscore.backend.photo.controller;

import com.picscore.backend.common.model.response.BaseResponse;
import com.picscore.backend.photo.model.entity.Photo;
import com.picscore.backend.photo.model.response.GetPhotoDetailResponse;
import com.picscore.backend.photo.model.response.GetPhotosResponse;
import com.picscore.backend.photo.model.request.UploadPhotoRequest;
import com.picscore.backend.photo.service.PhotoService;
import com.picscore.backend.user.model.entity.User;
import com.picscore.backend.user.repository.UserRepository;
import com.picscore.backend.user.service.OAuthService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class PhotoController {

    private final PhotoService photoService;
    private final OAuthService oAuthService;
    private final UserRepository userRepository;
    // 남 사진 조회
    @GetMapping("user/photo/{userId}")
    public ResponseEntity<Map<String, Object>> getPhotosByUserId(@PathVariable Long userId) {
        List<GetPhotosResponse> photos = photoService.getPhotosByUserId(userId);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "사진 조회 완료");
        response.put("data", photos);
        return ResponseEntity.ok(response);
    }
    // 내 사진 조회
    @GetMapping("user/photo/me")
    public ResponseEntity<Map<String, Object>> getMyPhotos(HttpServletRequest request) {
        // 토큰에서 사용자 정보 추출
        Long userId = oAuthService.findIdByNickName(request);
        List<GetPhotosResponse> photos = photoService.getPhotosByUserId(userId);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "사진 조회 완료");
        response.put("data", photos);
        return ResponseEntity.ok(response);
    }
    // 사진 업로드
    @PostMapping("/photo")
    public ResponseEntity<BaseResponse<HttpStatus>> savePhoto(HttpServletRequest request, @RequestBody UploadPhotoRequest payload) {
        // 토큰에서 사용자 정보 추출
        Long userId = oAuthService.findIdByNickName(request);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 유저 없음; " + userId));

        return photoService.savePhoto(
                user,
                payload.getImageUrl(),
                payload.getScore(),
                payload.getAnalysisChart(),
                payload.getAnalysisText(),
                payload.getIsPublic()
        );
    }

    // 사진 상세조회
    @GetMapping("photo/{photoId}")
    public ResponseEntity<BaseResponse<GetPhotoDetailResponse>> getPhotoDetail(@PathVariable Long photoId) {
        return photoService.getPhotoDetail(photoId);
    }
}


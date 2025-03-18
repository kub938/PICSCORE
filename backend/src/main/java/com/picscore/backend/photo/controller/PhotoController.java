package com.picscore.backend.photo.controller;

import com.picscore.backend.photo.entity.Photo;
import com.picscore.backend.photo.service.PhotoDTO;
import com.picscore.backend.photo.service.PhotoPayloadDTO;
import com.picscore.backend.photo.service.PhotoService;
import com.picscore.backend.user.model.entity.User;
import com.picscore.backend.user.repository.UserRepository;
import com.picscore.backend.user.service.OAuthService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
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
    @GetMapping("user/photo/{userId}")
    public ResponseEntity<Map<String, Object>> getPhotosByUserId(@PathVariable Long userId) {
        List<PhotoDTO> photos = photoService.getPhotosByUserId(userId);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "사진 조회 완료");
        response.put("photos", photos);
        return ResponseEntity.ok(response);
    }

    @GetMapping("user/photo/me")
    public ResponseEntity<Map<String, Object>> getMyPhotos(HttpServletRequest request) {
        // 토큰에서 사용자 정보 추출
        Long userId = oAuthService.findIdByNickName(request);
        List<PhotoDTO> photos = photoService.getPhotosByUserId(userId);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "사진 조회 완료");
        response.put("photos", photos);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/photo")
    public ResponseEntity<Map<String, Object>> savePhoto(HttpServletRequest request, @RequestBody PhotoPayloadDTO payload) {
        // 토큰에서 사용자 정보 추출
        Long userId = oAuthService.findIdByNickName(request);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID; " + userId));

        // 사진 저장 로직
        Photo savedPhoto = photoService.savePhoto(
                user,
                payload.getImageUrl(),
                payload.getScore(),
                payload.getAnalysisChart(),
                payload.getAnalysisText(),
                payload.getIsPublic()
        );
        // 응답 생성
        Map<String, Object> response = new HashMap<>();
        response.put("timeStamp", LocalDateTime.now().toString());
        response.put("isSuccess", true);
        response.put("status", HttpStatus.CREATED.value());
        response.put("message", "사진 업로드 완료");

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}


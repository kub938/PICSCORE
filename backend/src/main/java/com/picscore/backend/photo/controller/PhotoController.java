package com.picscore.backend.photo.controller;

import com.picscore.backend.photo.service.PhotoDTO;
import com.picscore.backend.photo.service.PhotoService;
import com.picscore.backend.user.jwt.JWTFilter;
import com.picscore.backend.user.jwt.JWTUtil;
import com.picscore.backend.user.service.OAuthService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class PhotoController {

    private final PhotoService photoService;
    private final OAuthService oAuthService;
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
}


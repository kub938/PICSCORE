package com.picscore.backend.photo.controller;

import com.picscore.backend.common.model.response.BaseResponse;
import com.picscore.backend.photo.model.entity.Photo;
import com.picscore.backend.photo.model.request.GetPhotosRequest;
import com.picscore.backend.photo.model.request.SearchPhotoRequest;
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

    // 주제 사진 검색
    @GetMapping("/photo/search")
    public ResponseEntity<BaseResponse<List<GetPhotosResponse>>> searchPhotosByHashtag(@RequestBody SearchPhotoRequest request) {
    return photoService.searchPhotosByHashtag(request.getKeyword());
    }

    // 공개-비공개 설정
    @PatchMapping("/photo/{photoId}")
    public ResponseEntity<BaseResponse<Void>> togglePublic(HttpServletRequest request, @PathVariable Long photoId) {
        Long userId = oAuthService.findIdByNickName(request);
        return photoService.togglePublic(photoId, userId);
    }
    // 사진 삭제
    @DeleteMapping("/photo/{photoId}")
    public ResponseEntity<BaseResponse<Void>> deletePhoto(HttpServletRequest request, @PathVariable Long photoId) {
        Long userId = oAuthService.findIdByNickName(request);

        return photoService.deletePhoto(photoId, userId);
    }

    // 남 사진 조회
    @GetMapping("/user/photo/{userId}")
    public ResponseEntity<BaseResponse<List<GetPhotosResponse>>>
    getPhotosByUserId(@PathVariable Long userId, @RequestBody GetPhotosRequest request) {
        return photoService.getPhotosByUserId(userId, request.getIsPublic());
    }
    // 내 사진 조회
    @GetMapping("/user/photo/me")
    public ResponseEntity<BaseResponse<List<GetPhotosResponse>>>
    getMyPhotos(HttpServletRequest request, @RequestBody GetPhotosRequest body) {
        // 토큰에서 사용자 정보 추출
        Long userId = oAuthService.findIdByNickName(request);
        return photoService.getPhotosByUserId(userId, body.getIsPublic());
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
    @GetMapping("/photo/{photoId}")
    public ResponseEntity<BaseResponse<GetPhotoDetailResponse>> getPhotoDetail(@PathVariable Long photoId) {
        return photoService.getPhotoDetail(photoId);
    }
    // 전체 사진 조회
    @GetMapping("/photo")
    public ResponseEntity<BaseResponse<Map<String, Object>>> getPaginatedPhotos() {
        return photoService.getPaginatedPhotos();
    }
}


package com.picscore.backend.photo.service;

import com.picscore.backend.common.model.response.BaseResponse;
import com.picscore.backend.photo.model.entity.Photo;
import com.picscore.backend.photo.model.response.GetPhotoDetailResponse;
import com.picscore.backend.photo.model.response.GetPhotosResponse;
import com.picscore.backend.photo.repository.PhotoHashtagRepository;
import com.picscore.backend.photo.repository.PhotoLikeRepository;
import com.picscore.backend.photo.repository.PhotoRepository;
import com.picscore.backend.user.model.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PhotoService {
    private final PhotoRepository photoRepository;
    private final PhotoLikeRepository photoLikeRepository;
    private final PhotoHashtagRepository photoHashtagRepository;
    public ResponseEntity<BaseResponse<List<GetPhotosResponse>>> getAllPhotos() {
        List<Photo> photos = photoRepository.getAllWithoutPublic();
        // createdAt 기준으로 내림차순 정렬
        List<Photo> sortedPhotos = photos.stream()
                .sorted(Comparator.comparing(Photo::getCreatedAt).reversed()) // 최신 순으로 정렬
                .collect(Collectors.toList());

        // DTO로 변환
        List<GetPhotosResponse> getPhotoResponses = sortedPhotos.stream()
                .map(photo -> new GetPhotosResponse(photo.getId(), photo.getImageUrl()))
                .collect(Collectors.toList());

        // 응답 반환
        return ResponseEntity.ok(BaseResponse.success("사진 조회 성공", getPhotoResponses));
    }public ResponseEntity<BaseResponse<List<GetPhotosResponse>>> getPhotosByUserId(Long userId) {
        List<Photo> photos = photoRepository.findPhotosByUserId(userId);
        List<GetPhotosResponse> getPhotoResponses = photos.stream()
                .map(photo -> new GetPhotosResponse(photo.getId(), photo.getImageUrl()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(BaseResponse.success("사진 조회 성공", getPhotoResponses));
    }
    public ResponseEntity<BaseResponse<HttpStatus>> savePhoto(User user, String imageUrl, Float score, String analysisChart, String analysisText, Boolean isPublic) {
        Photo photo = new Photo();
        photo.setUser(user);
        photo.setImageUrl(imageUrl);
        photo.setScore(score);
        photo.setAnalysisChart(analysisChart);
        photo.setAnalysisText(analysisText);
        photo.setIsPublic(isPublic);
        photoRepository.save(photo);
        return ResponseEntity.ok(BaseResponse.success("사진 업로드 완료", HttpStatus.CREATED));
    }

    public ResponseEntity<BaseResponse<GetPhotoDetailResponse>> getPhotoDetail(Long photoId) {
        // Photo 정보 조회
        Photo photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사진을 찾을 수 없습니다."));

        // User 정보 조회 (Photo와 연관된 User)
        User user = photo.getUser();

        // 좋아요 수 조회
        int likeCnt = photoLikeRepository.countByPhotoId(photoId);

        // 해시태그 조회
        List<String> hashTags = photoHashtagRepository.findByPhotoId(photoId)
                .stream()
                .map(photoHashtag -> photoHashtag.getHashtag().getName())
                .collect(Collectors.toList());

        // DTO에 데이터 설정
        GetPhotoDetailResponse response = new GetPhotoDetailResponse(user, photo, likeCnt, hashTags);
        return ResponseEntity.ok(BaseResponse.success("사진 상세 조회 성공",response));
    }
}




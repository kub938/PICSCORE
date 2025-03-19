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

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PhotoService {
    private final PhotoRepository photoRepository;
    private final PhotoLikeRepository photoLikeRepository;
    private final PhotoHashtagRepository photoHashtagRepository;
    public ResponseEntity<BaseResponse<Map<Integer, List<GetPhotosResponse>>>> getPaginatedPhotos() {
        // 사진 목록 조회
        List<Photo> photos = photoRepository.getAllWithoutPublic();

        // createdAt 기준으로 내림차순 정렬
        List<Photo> sortedPhotos = photos.stream()
                .sorted(Comparator.comparing(Photo::getCreatedAt).reversed())
                .collect(Collectors.toList());

        // 고정된 페이지 크기 설정
        int size = 2; // 한 페이지당 사진 개수
        int totalPages = (int) Math.ceil((double) sortedPhotos.size() / size); // 전체 페이지 수 계산

        // 페이지별 데이터 저장
        Map<Integer, List<GetPhotosResponse>> paginatedPhotos = new HashMap<>();
        for (int page = 0; page < totalPages; page++) {
            int start = page * size;
            int end = Math.min((page + 1) * size, sortedPhotos.size()); // 마지막 페이지 처리
            List<Photo> pagePhotos = sortedPhotos.subList(start, end);

            // DTO 변환
            List<GetPhotosResponse> getPhotoResponses = pagePhotos.stream()
                    .map(photo -> new GetPhotosResponse(photo.getId(), photo.getImageUrl()))
                    .collect(Collectors.toList());

            paginatedPhotos.put(page + 1, getPhotoResponses); // 페이지 번호는 1부터 시작하도록 설정
        }

        // 응답 반환
        return ResponseEntity.ok(BaseResponse.success("사진 리스트 조회 성공", paginatedPhotos));
    }
    public ResponseEntity<BaseResponse<List<GetPhotosResponse>>> getPhotosByUserId(Long userId) {
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




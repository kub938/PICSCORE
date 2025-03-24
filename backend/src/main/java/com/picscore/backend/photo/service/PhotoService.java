package com.picscore.backend.photo.service;

import com.picscore.backend.common.model.response.BaseResponse;
import com.picscore.backend.photo.model.entity.Photo;
import com.picscore.backend.photo.model.response.GetPhotoDetailResponse;
import com.picscore.backend.photo.model.response.GetPhotoTop5Response;
import com.picscore.backend.photo.model.response.GetPhotosResponse;
import com.picscore.backend.photo.repository.PhotoHashtagRepository;
import com.picscore.backend.photo.repository.PhotoLikeRepository;
import com.picscore.backend.photo.repository.PhotoRepository;
import com.picscore.backend.user.model.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * 사진 관련 비즈니스 로직을 처리하는 서비스 클래스
 */
@Service
@RequiredArgsConstructor
public class PhotoService {

    private final PhotoRepository photoRepository;
    private final PhotoLikeRepository photoLikeRepository;
    private final PhotoHashtagRepository photoHashtagRepository;


    /**
     * 주어진 키워드(해시태그)로 사진을 검색하는 메서드
     *
     * @param keyword 검색할 해시태그 키워드
     * @return ResponseEntity<BaseResponse<List<GetPhotosResponse>>> 검색된 사진 목록
     */
    public ResponseEntity<BaseResponse<List<GetPhotosResponse>>> searchPhotosByHashtag(String keyword) {
        List<GetPhotosResponse> results = photoRepository.findPhotosByHashtagName(keyword);
        return ResponseEntity.ok(BaseResponse.success("사진 조회 성공", results));
    }


    /**
     * 특정 사진을 삭제하는 메서드
     *
     * @param photoId 삭제할 사진의 ID
     * @param userId 삭제 요청을 한 사용자의 ID
     * @return ResponseEntity<BaseResponse<Void>> 삭제 결과
     */
    @Transactional
    public ResponseEntity<BaseResponse<Void>> deletePhoto(Long photoId, Long userId) {
        // 사진 조회
        Photo photo = photoRepository.findPhotoById(photoId);

        if (photo == null) {
            // 사진이 존재하지 않을 경우 에러 반환
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(BaseResponse.error("해당 사진을 찾을 수 없습니다."));
        }

        // 사진 소유자 정보 조회
        User user = photo.getUser();

        if (!user.getId().equals(userId)) {
            // 요청한 사용자 ID가 사진 소유자가 아닐 경우 에러 반환
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(BaseResponse.error("사진 삭제 권한이 없습니다."));
        }
        photoRepository.delete(photo);

        return ResponseEntity.ok(BaseResponse.withMessage("사진 삭제 완료"));
    }


    /**
     * 전체 사진을 페이징 처리하여 조회하는 메서드
     *
     * @param pageNum 조회할 페이지 번호 (1부터 시작)
     * @return ResponseEntity<BaseResponse<Map<String, Object>>> 페이징된 사진 목록
     */
    public ResponseEntity<BaseResponse<Map<String, Object>>> getPaginatedPhotos(int pageNum) {

        // PageRequest 객체 생성 (0부터 시작하는 페이지 번호 사용)
        PageRequest pageRequest = PageRequest.of(pageNum - 1, 5, Sort.by(Sort.Direction.DESC, "createdAt"));

        // 레포지토리에서 페이징된 데이터 조회
        Page<Photo> photoPage = photoRepository.findAllWithPublic(pageRequest);

        // DTO 변환
        List<GetPhotosResponse> photoResponses = photoPage.getContent().stream()
                .map(photo -> new GetPhotosResponse(photo.getId(), photo.getImageUrl()))
                .collect(Collectors.toList());

        // 응답 데이터 구성
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("totalPages", photoPage.getTotalPages());
        responseData.put("photos", photoResponses);

        // 응답 반환
        return ResponseEntity.ok(BaseResponse.success("사진 리스트 조회 성공", responseData));
    }


    /**
     * 특정 사용자의 사진을 조회하는 메서드
     *
     * @param userId 조회할 사용자의 ID
     * @param isPublic 공개/비공개 여부
     * @return ResponseEntity<BaseResponse<List<GetPhotosResponse>>> 조회된 사진 목록
     */
    public ResponseEntity<BaseResponse<List<GetPhotosResponse>>> getPhotosByUserId(Long userId, Boolean isPublic) {
        List<Photo> photos = photoRepository.findPhotosByUserId(userId, isPublic);
        List<GetPhotosResponse> getPhotoResponses = photos.stream()
                .map(photo -> new GetPhotosResponse(photo.getId(), photo.getImageUrl()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(BaseResponse.success("사진 조회 성공", getPhotoResponses));
    }


    /**
     * 새로운 사진을 저장하는 메서드
     *
     * @param user 사진을 업로드한 사용자
     * @param imageUrl 사진 URL
     * @param score 사진 점수
     * @param analysisChart 분석 차트
     * @param analysisText 분석 텍스트
     * @param isPublic 공개/비공개 여부
     * @return ResponseEntity<BaseResponse<HttpStatus>> 저장 결과
     */
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


    /**
     * 특정 사진의 상세 정보를 조회하는 메서드
     *
     * @param photoId 조회할 사진의 ID
     * @return ResponseEntity<BaseResponse<GetPhotoDetailResponse>> 사진 상세 정보
     */
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


    /**
     * 사진의 공개/비공개 상태를 토글하는 메서드
     *
     * @param photoId 상태를 변경할 사진의 ID
     * @param userId 변경 요청을 한 사용자의 ID
     * @return ResponseEntity<BaseResponse<Void>> 변경 결과
     */
    public ResponseEntity<BaseResponse<Void>> togglePublic(Long photoId, Long userId) {
        // 사진 조회
        Photo photo = photoRepository.findPhotoById(photoId);

        if (photo == null) {
            // 사진이 존재하지 않을 경우 에러 반환
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(BaseResponse.error("해당 사진을 찾을 수 없습니다."));
        }

        // 사진 소유자 정보 조회
        User user = photo.getUser();
        if (!user.getId().equals(userId)) {
            // 요청한 사용자 ID가 사진 소유자가 아닐 경우 에러 반환
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(BaseResponse.error("사진 수정 권한이 없습니다."));
        }
        photoRepository.togglePublic(photoId);
        return ResponseEntity.ok(BaseResponse.withMessage("사진 설정 완료"));

    }


    /**
     * 좋아요 수 기준 상위 5개의 사진을 조회하는 메서드
     *
     * @return ResponseEntity<BaseResponse<List<GetPhotoTop5Response>>> 상위 5개 사진 목록
     */
    public ResponseEntity<BaseResponse<List<GetPhotoTop5Response>>> getPhotoTop5() {

        PageRequest pageRequest = PageRequest.of(0, 5);

        List<Object[]> results = photoRepository.findTop5PhotosWithLikeCount(pageRequest);

        List<GetPhotoTop5Response> responses =
                results.stream()
                        .map(result -> {
                            Photo photo = (Photo) result[0];
                            Long likeCount = (Long) result[1];
                            return new GetPhotoTop5Response(
                                    photo.getId(),
                                    photo.getImageUrl(),
                                    photo.getScore(),
                                    likeCount
                            );
                        })
                        .collect(Collectors.toList());

        return ResponseEntity.ok(BaseResponse.success("Top5 사진 조회", responses));
    }
}




package com.picscore.backend.timeattack.service;

import com.picscore.backend.common.model.response.BaseResponse;
import com.picscore.backend.photo.model.entity.Photo;
import com.picscore.backend.photo.service.PhotoService;
import com.picscore.backend.timeattack.model.entity.TimeAttack;
import com.picscore.backend.timeattack.model.request.AnalysisPhotoRequest;
import com.picscore.backend.timeattack.model.request.SaveTimeAttackRequest;
import com.picscore.backend.timeattack.model.response.AnalysisPhotoResponse;
import com.picscore.backend.timeattack.model.response.AzureVisionResponse;
import com.picscore.backend.timeattack.model.response.GetRankingResponse;
import com.picscore.backend.timeattack.repository.TimeAttackRepository;
import com.picscore.backend.user.model.entity.User;
import com.picscore.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.CopyObjectRequest;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

/**
 * TimeAttack 관련 비즈니스 로직을 처리하는 서비스 클래스
 */
@Service
@RequiredArgsConstructor
public class TimeAttackService {

    private final TimeAttackRepository timeAttackRepository;
    private final UserRepository userRepository;
    private final RestTemplate restTemplate;
    private final S3Client s3Client;
    private final PhotoService photoService;

    @Value("${AZURE_ENDPOINT}")  // 환경 변수에서 API URL 가져오기
    private String visionApiUrl;

    @Value("${AZURE_COMPUTER_VISION_KEY}")  // 환경 변수에서 API Key 가져오기
    private String visionApiKey;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;


    /**
     * 페이지별 TimeAttack 랭킹을 조회하는 메소드
     *
     * @param pageNum 조회할 페이지 번호 (1부터 시작)
     * @return ResponseEntity<BaseResponse<Map<String, Object>>> 랭킹 정보를 포함한 응답
     */
    @Transactional
    public ResponseEntity<BaseResponse<Map<String, Object>>> getRanking(int pageNum) {
        // 페이지 요청 객체 생성 (페이지당 5개 항목)
        PageRequest pageRequest = PageRequest.of(pageNum-1, 5);

        // 레포지토리에서 사용자별 최고 점수 조회
        Page<TimeAttack> timeAttackPage = timeAttackRepository.findHighestScoresPerUser(pageRequest);

        List<GetRankingResponse> rankingResponses = new ArrayList<>();
        int baseRank = (pageNum - 1) * 5; // 현재 페이지의 기본 순위 계산

        // 조회된 TimeAttack 데이터를 GetRankingResponse 객체로 변환
        for (int i = 0; i < timeAttackPage.getContent().size(); i++) {
            TimeAttack timeAttack = timeAttackPage.getContent().get(i);

            int newRank = baseRank + i + 1;
            // 랭킹 업데이트
            timeAttack.updateRanking(newRank);
            // 변경 사항 저장
            timeAttackRepository.save(timeAttack);

            rankingResponses.add(new GetRankingResponse(
                    timeAttack.getUser().getId(),
                    timeAttack.getUser().getNickName(),
                    timeAttack.getUser().getProfileImage(),
                    timeAttack.getPhotoImage(),
                    timeAttack.getTopic(),
                    timeAttack.getScore(),
                    newRank
            ));
        }

        // 응답 데이터 구성
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("totalPage", timeAttackPage.getTotalPages());
        responseData.put("ranking", rankingResponses);

        // 성공 응답 반환
        return ResponseEntity.ok(BaseResponse.success("랭킹 전체 목록 조회 성공", responseData));
    }


    /**
     * 사진을 분석하고 결과를 반환하는 메서드
     *
     * @param request AnalysisPhotoRequest 객체 (분석할 이미지와 주제 정보 포함)
     * @return ResponseEntity<BaseResponse<AnalysisPhotoResponse>> 분석 결과 응답
     * @throws IOException 파일 처리 중 발생할 수 있는 입출력 예외
     */
    public ResponseEntity<BaseResponse<AnalysisPhotoResponse>> analysisPhoto(
            AnalysisPhotoRequest request
    ) throws IOException {
        String url = visionApiUrl + "vision/v3.2/analyze?visualFeatures=Tags";

        // HTTP 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.set("Ocp-Apim-Subscription-Key", visionApiKey);

        // 이미지 파일을 바이트 배열로 변환
        byte[] imageFileBytes = request.getImageFile().getBytes();
        HttpEntity<byte[]> requestEntity = new HttpEntity<>(imageFileBytes, headers);

        try {
            // Azure Vision API 호출
            ResponseEntity<AzureVisionResponse> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    requestEntity,
                    AzureVisionResponse.class
            );

            // API 응답에서 태그 정보 추출 및 변환
            List<AnalysisPhotoResponse> analysisResults = response.getBody().getTags().stream()
                    .map(tag -> new AnalysisPhotoResponse(tag.getName(), tag.getConfidence()))
                    .collect(Collectors.toList());

            // 요청된 주제와 일치하는 태그 중 가장 높은 신뢰도를 가진 태그 선택
            AnalysisPhotoResponse result = analysisResults.stream()
                    .filter(tag -> tag.getName().toLowerCase().contains(request.getTopic().toLowerCase()))
                    .max(Comparator.comparing(AnalysisPhotoResponse::getConfidence))
                    .orElseGet(() -> {
                        // 랜덤한 값(0.00 ~ 0.20) 생성
                        float randomConfidence = new Random().nextFloat() * 0.20f;
                        return new AnalysisPhotoResponse("일치 항목 없음", randomConfidence);
                    });

            return ResponseEntity.ok(BaseResponse.success("이미지 분석 성공", result));
        } catch (RestClientException e) {
            // API 호출 실패 시 에러 응답 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(BaseResponse.error("이미지 분석 실패: " + e.getMessage()));
        }
    }


    /**
     * 타임어택 결과를 저장하는 메서드
     *
     * @param userId 사용자 ID
     * @param request SaveTimeAttackRequest 객체 (저장할 타임어택 정보)
     * @return ResponseEntity<BaseResponse<HttpStatus>> 저장 결과 응답
     */
    public ResponseEntity<BaseResponse<HttpStatus>> saveTimeAttack(
            Long userId, SaveTimeAttackRequest request
    ) {
        // 사용자 정보 조회
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        String tempFolder = "temp/";
        String activityFolder = "activity/";

        // S3에서 임시 폴더의 이미지를 activity 폴더로 이동
        CopyObjectRequest copyObjectRequest = CopyObjectRequest.builder()
                .sourceBucket(bucketName)
                .sourceKey(tempFolder + request.getImageName())
                .destinationBucket(bucketName)
                .destinationKey(activityFolder + request.getImageName())
                .build();
        s3Client.copyObject(copyObjectRequest);

        // 새로운 이미지 URL 생성
        String activityImageUrl = photoService.getFileUrl(activityFolder, request.getImageName());

        // 타임어택 정보를 DB에 저장
        TimeAttack timeAttack = new TimeAttack(
                user, activityImageUrl, request.getTopic(), 1, request.getScore()
        );
        timeAttackRepository.save(timeAttack);

        return ResponseEntity.ok(BaseResponse.success("타임어택 저장 완료", HttpStatus.CREATED));
    }
}


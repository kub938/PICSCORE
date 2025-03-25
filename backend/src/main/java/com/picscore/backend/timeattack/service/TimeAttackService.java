package com.picscore.backend.timeattack.service;

import com.picscore.backend.common.model.response.BaseResponse;
import com.picscore.backend.timeattack.model.entity.TimeAttack;
import com.picscore.backend.timeattack.model.response.AnalysisPhotoResponse;
import com.picscore.backend.timeattack.model.response.AzureVisionResponse;
import com.picscore.backend.timeattack.model.response.GetRankingResponse;
import com.picscore.backend.timeattack.repository.TimeAttackRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * TimeAttack 관련 비즈니스 로직을 처리하는 서비스 클래스
 */
@Service
@RequiredArgsConstructor
public class TimeAttackService {

    private final TimeAttackRepository timeAttackRepository;
    private final RestTemplate restTemplate;

    @Value("${VISION_API_URL}")  // 환경 변수에서 API URL 가져오기
    private String visionApiUrl;

    @Value("${VISION_API_KEY}")  // 환경 변수에서 API Key 가져오기
    private String visionApiKey;



    /**
     * 페이지별 TimeAttack 랭킹을 조회하는 메소드
     *
     * @param pageNum 조회할 페이지 번호 (1부터 시작)
     * @return ResponseEntity<BaseResponse<Map<String, Object>>> 랭킹 정보를 포함한 응답
     */
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
            rankingResponses.add(new GetRankingResponse(
                    timeAttack.getUser().getId(),
                    timeAttack.getUser().getNickName(),
                    timeAttack.getUser().getProfileImage(),
                    timeAttack.getScore(),
                    baseRank + i + 1 // 순위 계산
            ));
        }

        // 응답 데이터 구성
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("totalPage", timeAttackPage.getTotalPages());
        responseData.put("ranking", rankingResponses);

        // 성공 응답 반환
        return ResponseEntity.ok(BaseResponse.success("랭킹 전체 목록 조회 성공", responseData));
    }

    public ResponseEntity<BaseResponse<List<AnalysisPhotoResponse>>> analysisPhoto(byte[] imageBlob) {
        String url = visionApiUrl;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.set("Ocp-Apim-Subscription-Key", visionApiKey);

        HttpEntity<byte[]> requestEntity = new HttpEntity<>(imageBlob, headers);

        try {
            ResponseEntity<AzureVisionResponse> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    requestEntity,
                    AzureVisionResponse.class
            );

            List<AnalysisPhotoResponse> analysisResults = response.getBody().getTags().stream()
                    .map(tag -> new AnalysisPhotoResponse(tag.getName(), tag.getConfidence()))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(BaseResponse.success("이미지 분석 성공", analysisResults));
        } catch (RestClientException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(BaseResponse.error("이미지 분석 실패: " + e.getMessage()));
        }
    }
}


package com.picscore.backend.GPT;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
public class OpenAiImageService {

    private final RestTemplate restTemplate;

    private String apiKey;

    public OpenAiImageService(@Value("${api.openai.api-key}") String apiKey) {
        this.restTemplate = new RestTemplate();
        this.apiKey = apiKey;
        System.out.printf("########## GPT API KEY="+apiKey);
    }

    public String analyzeImage(String imageUrl) {
        // OpenAI API 요청 JSON Body
        Map<String, Object> requestBody = Map.of(
                "model", "gpt-4o-mini",
                "messages", List.of(
                        Map.of("role", "system", "content", "당신은 30년 경력의 사진작가이며 NIMA(Neural Image Assessment)모델을 학습하여 이미지를 분석하고 수치화 할 수 있습니다."),
                        Map.of("role", "user", "content", List.of(
                                Map.of("type", "image_url", "image_url", Map.of("url", imageUrl)), // ✅ 수정된 부분
                                Map.of("type", "text", "text", "\n" +
                                        "\n" +
                                        "Please rate this image on 6 criteria (composition, Sharpness, noise, Color Harmony, exposure, and Aesthetic Quality) out of 100.")
                        ))
                ),
                "max_tokens", 1000
        );

        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        // 요청 엔티티 생성
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        // OpenAI API에 요청 보내기
        try {
            return restTemplate.postForObject("https://api.openai.com/v1/chat/completions", requestEntity, String.class);
        } catch (Exception e) {
            System.out.println("Error occurred: " + e.getMessage());
            return "Error occurred";
        }
    }
}

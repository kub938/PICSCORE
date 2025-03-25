package com.picscore.backend.GPT;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
public class OpenAiImageService {

    private final WebClient webClient;

    public OpenAiImageService(@Value("${api.openai.api-key}") String apiKey) {
        System.out.printf("gpt api key="+apiKey);
        this.webClient = WebClient.builder()
                .baseUrl("https://api.openai.com/v1")
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public String analyzeImage(String imageUrl) {
        // OpenAI API 요청 JSON Body
        Map<String, Object> requestBody = Map.of(
                "model", "gpt-4o-mini",  // ✅ 최신 모델 사용
                "messages", List.of(
                        Map.of("role", "system", "content", "Analyze the image and provide structured numerical insights."),
                        Map.of("role", "user", "content", List.of(
                                Map.of("type", "image_url", "image_url", imageUrl),
                                Map.of("type", "text", "text", "Describe this image numerically.")
                        ))
                ),
                "max_tokens", 1000
        );

        return webClient.post()
                .uri("/chat/completions")  // ✅ "/v1"은 baseUrl에 포함되어 있음
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}


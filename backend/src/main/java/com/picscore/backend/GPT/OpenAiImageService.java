package com.picscore.backend.GPT;

import lombok.RequiredArgsConstructor;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

@Service
@RequiredArgsConstructor
public class OpenAiImageService {

    private final RestTemplate restTemplate;
    private final S3Client s3Client;
    @Value("${api.openai.api-key}")
    private String apiKey;
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    public String analyzeImage(String originalImageUrl) throws IOException {
        // ✅ 1. 원본 이미지 다운로드 후 리사이징
        byte[] resizedImage = resizeImage(originalImageUrl, 500, 500); // 500X500 >> 250X250 >> 200X200

        // ✅ 2. 리사이징된 이미지를 S3에 업로드하고 새 URL 반환
        String resizedImageUrl = uploadToS3(resizedImage);

        // ✅ 3. OpenAI API 요청 JSON Body (리사이징된 이미지 URL 전송)
        Map<String, Object> requestBody = Map.of(
                "model", "gpt-4o-mini",
                "messages", List.of(
                        Map.of("role", "system", "content", "당신은 30년 경력의 사진작가이며 NIMA(Neural Image Assessment)모델을 학습하여 이미지를 분석하고 수치화 할 수 있습니다."),
                        Map.of("role", "user", "content", List.of(
                                Map.of("type", "image_url", "image_url", Map.of("url", resizedImageUrl)), // ✅ 리사이징된 이미지 URL 사용
                                Map.of("type", "text", "text", "Print in Korean.First, score this image individually and in total out of 100 based on six criteria: composition, Sharpness, noise, color harmony, exposure, and aesthetic quality. Express the score in the form of \"criteria: score\". Second, output the topic related to the recognized image in word form. Third, output the mood of the image in adjective form.")
                        ))
                ),
                "max_tokens", 500   // 500 >> 250
        );

        // ✅ 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        // ✅ 요청 엔티티 생성
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        // ✅ OpenAI API에 요청 보내기 (예외 처리 강화)
        try {
            ResponseEntity<String> response = restTemplate.postForEntity(
                    "https://api.openai.com/v1/chat/completions",
                    requestEntity,
                    String.class
            );

            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody();
            } else {
                throw new RuntimeException("OpenAI API 요청 실패: HTTP " + response.getStatusCode());
            }
        } catch (Exception e) {
            System.err.println("❌ OpenAI API 요청 중 오류 발생: " + e.getMessage());
            return "Error occurred: " + e.getMessage();
        }
    }

    public byte[] resizeImage(String imageUrl, int width, int height) throws IOException {
        // ✅ 안전한 이미지 다운로드
        BufferedImage originalImage = downloadImage(imageUrl);

        // ✅ 이미지 리사이징 (해상도 낮추기)
        BufferedImage resizedImage = Thumbnails.of(originalImage)
                .size(width, height)
                .outputQuality(0.8) //0.7 >> 0.5 >> 0.3
                .asBufferedImage();

        // ✅ 압축된 이미지 변환 (Byte 배열로 변환하여 API로 전달 가능)
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(resizedImage, "jpg", baos);
        return baos.toByteArray();
    }

    // ✅ 리사이징된 이미지를 S3에 업로드하고 URL 반환
    public String uploadToS3(byte[] imageBytes) {
        try {
            String fileName = "resized/" + UUID.randomUUID() + ".jpg";
            ByteArrayInputStream inputStream = new ByteArrayInputStream(imageBytes);

            Map<String, String> metadata = new HashMap<>();
            metadata.put("Content-Type", "image/jpeg");

            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .metadata(metadata)
                    .build();

            s3Client.putObject(request, RequestBody.fromInputStream(inputStream, imageBytes.length));

            return getFileUrl(fileName);
        } catch (Exception e) {
            throw new RuntimeException("S3 업로드 실패: " + e.getMessage());
        }
    }

    // ✅ 이미지 다운로드
    public static BufferedImage downloadImage(String imageUrl) throws IOException {
        URL url = new URL(imageUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        // ✅ User-Agent 추가 (403 방지)
        connection.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36");
        connection.setRequestProperty("Accept", "image/*");
        connection.setRequestProperty("Accept-Encoding", "gzip, deflate, br");
        connection.setInstanceFollowRedirects(true);
        connection.connect();

        int responseCode = connection.getResponseCode();
        if (responseCode != 200) {
            throw new IOException("Failed to download image: HTTP " + responseCode);
        }

        try (InputStream inputStream = connection.getInputStream()) {
            return ImageIO.read(inputStream);
        }
    }

    // ✅ 파일 URL 생성
    private String getFileUrl(String fileName) {
        return String.format("https://%s.s3.%s.amazonaws.com/%s",
                bucketName,
                s3Client.serviceClientConfiguration().region(),
                fileName);
    }
}

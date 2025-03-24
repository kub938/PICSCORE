package com.picscore.backend.s3;

import com.picscore.backend.common.model.response.BaseResponse;
import com.picscore.backend.photo.model.entity.Photo;
import com.picscore.backend.photo.repository.PhotoRepository;
import com.picscore.backend.user.model.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URL;
import java.net.URLConnection;
import java.util.Base64;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class S3Service {
    
    private final PhotoRepository photoRepository;
    private final S3Client s3Client;
    private final String bucketName;
    private final String googleKey;
    private final String azureKey;
    private final String azureEndpoint;

    private final RestTemplate restTemplate;


    public S3Service(PhotoRepository photoRepository, S3Client s3Client, RestTemplate restTemplate,
                     @Value("${cloud.aws.s3.bucket}") String bucketName, @Value("${api.google.api-key}") String googleKey,
                     @Value("${api.azure.api-key}") String azureKey, @Value("${api.azure.end-point}") String azureEndpoint) {
        this.photoRepository = photoRepository;
        this.s3Client = s3Client;
        this.bucketName = bucketName;
        this.googleKey = googleKey;
        this.azureKey = azureKey;
        this.azureEndpoint = azureEndpoint;
        this.restTemplate = restTemplate;
    }
    // 이미지 분석 요청 (Google Vision API 활용)
    public ResponseEntity<BaseResponse<Object>> analysisFile(String imageUrl) {
        String googleUrl = "https://vision.googleapis.com/v1/images:annotate?key=" + googleKey;

        try {
            // S3에 저장된 이미지 URL을 바탕으로 Base64로 변환
            String base64Image = encodeImageToBase64(imageUrl);
            System.out.printf("base62 =",base64Image);

            // Google Vision API 요청 본문 구성
            String requestJson = "{\"requests\":[{\"image\":{\"content\":\"" + base64Image + "\"},\"features\":[{\"type\":\"LABEL_DETECTION\"}]}]}";

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> requestEntity = new HttpEntity<>(requestJson, headers);

            ResponseEntity<String> response = restTemplate.exchange(googleUrl, HttpMethod.POST, requestEntity, String.class);

            return ResponseEntity.ok(BaseResponse.success("이미지 분석 성공", response.getBody()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(BaseResponse.error("이미지 분석 실패: " + e.getMessage()));
        }
    }

    // S3 이미지 URL을 Base64로 변환하는 메서드
    private String encodeImageToBase64(String imageUrl) throws IOException {
        URL url = new URL(imageUrl);
        URLConnection connection = url.openConnection();
        try (InputStream inputStream = connection.getInputStream()) {
            byte[] imageBytes = inputStream.readAllBytes();
            return Base64.getEncoder().encodeToString(imageBytes);
        }
    }
    public ResponseEntity<BaseResponse<HttpStatus>> saveFile(User user, String imageUrl,String imageName, Float score, String analysisChart, String analysisText, Boolean isPublic) {
        String tempFolder = "temp/";
        String permanentFolder = "permanent/";
        // S3에서 임시 폴더에서 영구 폴더로 이미지 이동
        CopyObjectRequest copyObjectRequest = CopyObjectRequest.builder()
                .sourceBucket(bucketName)    // 원본 버킷
                .sourceKey(tempFolder+imageName)        // 원본 경로
                .destinationBucket(bucketName) // 동일한 버킷 내 복사
                .destinationKey(permanentFolder+imageName) // 새로운 경로
                .build();
        s3Client.copyObject(copyObjectRequest);
        // mySQL에 저장
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

    // 임시 파일 업로드
    public ResponseEntity<BaseResponse<UploadFileResponse>> uploadFile(MultipartFile file) throws IOException {
        String fileName = generateFileName(file);
        String tempFolder = "temp/";
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(tempFolder+fileName)
                .contentType(file.getContentType())
                .build();
        try {
            s3Client.putObject(putObjectRequest,
                    RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
            UploadFileResponse uploadFileResponse = new UploadFileResponse(getFileUrl(tempFolder,fileName), fileName);
            return ResponseEntity.ok(BaseResponse.success("임시 파일 저장 완료",uploadFileResponse));
        } catch (Exception e) {
            System.out.printf("업로드 실패");
            return ResponseEntity.internalServerError().body(BaseResponse.error("파일 업로드 실패: " + e.getMessage()));
        }
    }
    
    // 파일 다운로드 (바이트 배열로 반환)
    public byte[] downloadFile(String fileName) {
        String permanentFolder = "permanent/";
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(permanentFolder+fileName)
                .build();
                
        return s3Client.getObjectAsBytes(getObjectRequest).asByteArray();
    }
    
    // 파일 삭제
    public void deleteFile(String fileName) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .build();
                
        s3Client.deleteObject(deleteObjectRequest);
    }
    
    // 버킷 내 모든 파일 목록 조회
    public List<String> listFiles() {
        ListObjectsV2Request listObjectsRequest = ListObjectsV2Request.builder()
                .bucket(bucketName)
                .build();
        
        ListObjectsV2Response response = s3Client.listObjectsV2(listObjectsRequest);
        
        return response.contents().stream()
                .map(S3Object::key)
                .collect(Collectors.toList());
    }
    
    // 파일 URL 생성
    private String getFileUrl(String folder, String fileName) {
        return String.format("https://%s.s3.%s.amazonaws.com/%s%s",
                bucketName, 
                s3Client.serviceClientConfiguration().region(),
                folder,
                fileName);
    }
    
    // 파일명 생성 (중복 방지를 위해 UUID 사용)
    private String generateFileName(MultipartFile file) {
        return UUID.randomUUID() + "-" + file.getOriginalFilename();
    }


}
package main.java.com.picscore.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class S3Service {
    
    private final S3Client s3Client;
    private final String bucketName;
    
    public S3Service(S3Client s3Client, @Value("${cloud.aws.s3.bucket}") String bucketName) {
        this.s3Client = s3Client;
        this.bucketName = bucketName;
    }
    
    // 파일 업로드
    public String uploadFile(MultipartFile file) throws IOException {
        String fileName = generateFileName(file);
        
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .contentType(file.getContentType())
                .build();
                
        s3Client.putObject(putObjectRequest, 
                RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
                
        return getFileUrl(fileName);
    }
    
    // 파일 다운로드 (바이트 배열로 반환)
    public byte[] downloadFile(String fileName) {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
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
    private String getFileUrl(String fileName) {
        return String.format("https://%s.s3.%s.amazonaws.com/%s", 
                bucketName, 
                s3Client.serviceClientConfiguration().region(), 
                fileName);
    }
    
    // 파일명 생성 (중복 방지를 위해 UUID 사용)
    private String generateFileName(MultipartFile file) {
        return UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
    }
}
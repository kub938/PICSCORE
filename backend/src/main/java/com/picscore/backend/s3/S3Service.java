package com.picscore.backend.s3;

import com.picscore.backend.common.model.response.BaseResponse;
import com.picscore.backend.photo.model.entity.Photo;
import com.picscore.backend.photo.repository.PhotoRepository;
import com.picscore.backend.user.model.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    
    private final PhotoRepository photoRepository;
    private final S3Client s3Client;
    private final String bucketName;

    public S3Service(PhotoRepository photoRepository, S3Client s3Client, @Value("${cloud.aws.s3.bucket}") String bucketName) {
        this.photoRepository = photoRepository;
        this.s3Client = s3Client;
        this.bucketName = bucketName;
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
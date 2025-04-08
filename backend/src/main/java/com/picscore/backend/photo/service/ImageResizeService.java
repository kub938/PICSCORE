package com.picscore.backend.photo.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import javax.imageio.ImageIO;

@Slf4j
@Service
@RequiredArgsConstructor
public class ImageResizeService {

    private final S3Client s3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;
    private final String sourcePrefix = "permanent/";
    private final String targetPrefix = "thumbnail/";

    public void resizeAllImagesInS3() {
        log.info("썸네일 리사이징 시작");

        ListObjectsV2Request listRequest = ListObjectsV2Request.builder()
                .bucket(bucketName)
                .prefix(sourcePrefix)
                .build();

        ListObjectsV2Response listResponse = s3Client.listObjectsV2(listRequest);

        for (S3Object s3Object : listResponse.contents()) {
            String key = s3Object.key();
            if (key.endsWith(".jpg") || key.endsWith(".jpeg") || key.endsWith(".png") || key.endsWith(".webp")) {
                try {
                    resizeAndUpload(key);
                } catch (Exception e) {
                    log.error("이미지 리사이징 실패: {}", key, e);
                }
            }
        }

        log.info("썸네일 리사이징 완료");
    }

    private void resizeAndUpload(String sourceKey) throws IOException {
        log.info("리사이징 중: {}", sourceKey);

        GetObjectRequest getRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(sourceKey)
                .build();

        ResponseInputStream<GetObjectResponse> objectInputStream = s3Client.getObject(getRequest);
        BufferedImage originalImage = ImageIO.read(objectInputStream);

        BufferedImage thumbnail = Thumbnails.of(originalImage)
                .size(150, 150)
                .asBufferedImage();

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(thumbnail, "jpg", baos); // Always save as JPG

        String fileName = sourceKey.replace(sourcePrefix, "").replaceAll("\\.[^.]+$", ".jpg");
        String newKey = targetPrefix + fileName;

        PutObjectRequest putRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(newKey)
                .contentType("image/jpeg")
                .build();

        s3Client.putObject(putRequest, RequestBody.fromBytes(baos.toByteArray()));

        log.info("업로드 완료: {}", newKey);
    }
}


package com.picscore.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Request;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Response;
import software.amazon.awssdk.services.s3.model.S3Object;

@Component
public class S3Test implements CommandLineRunner {

    @Value("${cloud.aws.credentials.access-key}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secret-key}")
    private String secretKey;

    @Value("${cloud.aws.region.static}")
    private String region;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName; // bucketName으로 수정

    @Override
    public void run(String... args) throws Exception {
        AwsBasicCredentials credentials = AwsBasicCredentials.create(accessKey, secretKey);
        S3Client s3Client = S3Client.builder()
                .region(Region.of(region))
                .credentialsProvider(StaticCredentialsProvider.create(credentials))
                .build();

        ListObjectsV2Request request = ListObjectsV2Request.builder()
                .bucket(bucketName)
                .build();

        try {
            ListObjectsV2Response response = s3Client.listObjectsV2(request);
            if (!response.contents().isEmpty()) {
                System.out.println("S3 버킷에 접근 가능합니다. 버킷 내 파일 목록:");
                System.out.println(response.contents());
                for (S3Object obj : response.contents()) {
                    System.out.println(obj.key());
                }
            } else {
                System.out.println("S3 버킷에 접근 가능하지만 비어 있습니다.");
            }
        } catch (Exception e) {
            System.out.println("오류 발생: " + e.getMessage());
        }
    }
}

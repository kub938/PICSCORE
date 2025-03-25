package com.picscore.backend.s3;

public class UploadFileResponse {

    public String imageUrl;
    public String imageName; // JSON 형태로 저장된 데이터

    public UploadFileResponse(String imageUrl, String imageName) {

        this.imageUrl = imageUrl;
        this.imageName = imageName;

    }
}

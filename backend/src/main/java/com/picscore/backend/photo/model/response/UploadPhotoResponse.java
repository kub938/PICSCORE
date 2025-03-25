package com.picscore.backend.photo.model.response;

public class UploadPhotoResponse {

    public String imageUrl;
    public String imageName; // JSON 형태로 저장된 데이터

    public UploadPhotoResponse(String imageUrl, String imageName) {

        this.imageUrl = imageUrl;
        this.imageName = imageName;

    }
}

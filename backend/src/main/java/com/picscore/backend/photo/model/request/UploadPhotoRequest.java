package com.picscore.backend.photo.model.request;

import lombok.Data;

@Data
public class UploadPhotoRequest {
    private String imageUrl;
    private Float score;
    private String analysisChart; // nullable
    private String analysisText; // nullable
    private Boolean isPublic;
}
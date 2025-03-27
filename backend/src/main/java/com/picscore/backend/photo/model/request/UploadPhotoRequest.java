package com.picscore.backend.photo.model.request;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class UploadPhotoRequest {
    private String imageUrl;
    private String imageName;
    private Float score;
    private Map<String, Integer> analysisChart; // nullable
    private Map<String, List<String>> analysisText; // nullable
    private Boolean isPublic;
    private String photoType;
}

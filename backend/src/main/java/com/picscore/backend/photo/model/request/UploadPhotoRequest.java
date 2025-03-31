package com.picscore.backend.photo.model.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
public class UploadPhotoRequest {
    private List hashTag;
    private String imageName;
    private Float score;
    private Map<String, Integer> analysisChart = new HashMap<>(); // ✅ 기본값 추가
    private Map<String, String> analysisText = new HashMap<>(); // ✅ 기본값 추가
    private Boolean isPublic;
    private String photoType;
}

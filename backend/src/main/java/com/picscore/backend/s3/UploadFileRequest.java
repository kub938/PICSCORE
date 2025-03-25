package com.picscore.backend.s3;

import lombok.Data;

@Data
public class UploadFileRequest {
    private String imageUrl;
    private String imageName;
    private Float score;
    private String analysisChart; // nullable
    private String analysisText; // nullable
    private Boolean isPublic;
}

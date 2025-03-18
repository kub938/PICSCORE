package com.picscore.backend.photo.service;

import com.picscore.backend.user.model.entity.User;
import lombok.Data;

@Data
public class PhotoPayloadDTO {
    private String imageUrl;
    private Float score;
    private String analysisChart; // nullable
    private String analysisText; // nullable
    private Boolean isPublic;
}
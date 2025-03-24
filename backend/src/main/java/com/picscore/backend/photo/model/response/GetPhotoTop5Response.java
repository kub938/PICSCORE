package com.picscore.backend.photo.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetPhotoTop5Response {

    private Long photoId;
    private String imageUrl;
    private float score;
    private Long likeCnt;
}

package com.picscore.backend.photo.model.response;

import lombok.Data;

@Data
public class GetPhotosResponse {
    private Long id;
    private String imageUrl;

    public GetPhotosResponse(Long id, String imageUrl) {
        this.id = id;
        this.imageUrl = imageUrl;
    }
}


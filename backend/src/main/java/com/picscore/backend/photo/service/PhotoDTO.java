package com.picscore.backend.photo.service;

import lombok.Data;

@Data
public class PhotoDTO {
    private Long id;
    private String imageUrl;

    public PhotoDTO(Long id, String imageUrl) {
        this.id = id;
        this.imageUrl = imageUrl;
    }
}


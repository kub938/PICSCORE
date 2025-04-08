package com.picscore.backend.photo.controller;

import com.picscore.backend.photo.service.ImageResizeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/image")
public class ImageAdminController {

    private final ImageResizeService imageResizeService;

    @PostMapping("/resize-all")
    public ResponseEntity<String> resizeAll() {
        imageResizeService.resizeAllImagesInS3();
        return ResponseEntity.ok("썸네일 리사이징 완료");
    }
}


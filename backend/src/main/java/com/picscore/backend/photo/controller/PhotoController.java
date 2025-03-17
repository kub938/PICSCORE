package com.picscore.backend.photo.controller;

import com.picscore.backend.photo.service.PhotoDTO;
import com.picscore.backend.photo.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class PhotoController {

    private final PhotoService photoService;

    @Autowired
    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }

    @GetMapping("user/photo/{userId}")
    public ResponseEntity<Map<String, Object>> getPhotosByUserId(@PathVariable Long userId) {
        System.out.println("userId111111 = " + userId);
        List<PhotoDTO> photos = photoService.getPhotosByUserId(userId);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "사진 조회 완료");
        response.put("photos", photos);
        return ResponseEntity.ok(response);
    }
}


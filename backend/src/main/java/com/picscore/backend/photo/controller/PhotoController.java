package com.picscore.backend.photo.controller;

import com.picscore.backend.photo.entity.Photo;
import com.picscore.backend.photo.service.PhotoService;
import com.picscore.backend.user.model.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/photo")
public class PhotoController {

    private final PhotoService photoService;

    @Autowired
    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }

    @GetMapping("/{userId}")
    public List<Photo> getPhotosByUserId(@PathVariable Long userId) {
        return photoService.getPhotosByUserId(userId);
    }

    @GetMapping("/me")
    public List<Photo> getPhotosByUser(@PathVariable User user) {
        return photoService.getPhotosByUser(user);
    }
}

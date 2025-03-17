package com.picscore.backend.photo.service;

import com.picscore.backend.photo.entity.Photo;
import com.picscore.backend.photo.repository.PhotoRepository;
import com.picscore.backend.user.model.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhotoService {

    private final PhotoRepository photoRepository;

    @Autowired
    public PhotoService(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
    }

    public List<Photo> getPhotosByUserId(Long userId) {
        return photoRepository.findPhotosByUserId(userId);
    }

    public List<Photo> getPhotosByUser(User user) {
        return photoRepository.findPhotosByUser(user);
    }
}

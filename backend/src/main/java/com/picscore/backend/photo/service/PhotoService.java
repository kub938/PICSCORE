package com.picscore.backend.photo.service;

import com.picscore.backend.photo.entity.Photo;
import com.picscore.backend.photo.repository.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PhotoService {
    private final PhotoRepository photoRepository;

    @Autowired
    public PhotoService(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
    }

    public List<PhotoDTO> getPhotosByUserId(Long userId) {
        System.out.println("userId22222 = " + userId);
        List<Photo> photos = photoRepository.findPhotosByUserId(userId);
        System.out.println("photos = " + photos);
        List<PhotoDTO> photoDTOs = photos.stream()
                .map(photo -> new PhotoDTO(photo.getId(), photo.getImageUrl()))
                .collect(Collectors.toList());
        System.out.println("photoDTOs = " + photoDTOs);
        return photoDTOs;
    }
}




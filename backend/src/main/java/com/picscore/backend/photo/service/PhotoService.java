package com.picscore.backend.photo.service;

import com.picscore.backend.photo.entity.Photo;
import com.picscore.backend.photo.repository.PhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PhotoService {
    private final PhotoRepository photoRepository;

    public List<PhotoDTO> getPhotosByUserId(Long userId) {
        List<Photo> photos = photoRepository.findPhotosByUserId(userId);
        List<PhotoDTO> photoDTOs = photos.stream()
                .map(photo -> new PhotoDTO(photo.getId(), photo.getImageUrl()))
                .collect(Collectors.toList());
        return photoDTOs;
    }


}




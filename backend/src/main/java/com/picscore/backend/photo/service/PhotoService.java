package com.picscore.backend.photo.service;

import com.picscore.backend.photo.entity.Photo;
import com.picscore.backend.photo.repository.PhotoRepository;
import com.picscore.backend.user.model.entity.User;
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
    public Photo savePhoto(User user, String imageUrl, Float score, String analysisChart, String analysisText, Boolean isPublic) {
        Photo photo = new Photo();
        photo.setUser(user);
        photo.setImageUrl(imageUrl);
        photo.setScore(score);
        photo.setAnalysisChart(analysisChart);
        photo.setAnalysisText(analysisText);
        photo.setIsPublic(isPublic);

        return photoRepository.save(photo);
    }

}




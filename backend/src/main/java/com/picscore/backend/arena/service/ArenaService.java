package com.picscore.backend.arena.service;

import com.picscore.backend.arena.model.ArenaPhotoResponse;
import com.picscore.backend.photo.model.entity.Photo;
import com.picscore.backend.photo.repository.PhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ArenaService {

    final private PhotoRepository photoRepository;
    public Map<String, Object> randomPhotos () {
        Map<String, Object> response = new HashMap<>();
        // 랜덤이미지 4장
        // is_public=true, score 일치X
        List<Photo> photos = photoRepository.getRandomPublicPhotos();

        if (photos.size() < 4) {
            throw new IllegalStateException("조건에 맞는 사진이 충분하지 않습니다.");
        }

        // 점수 기준으로 내림차순 정렬 후 photo_id만 추출
        List<String> answer = photos.stream()
                .sorted(Comparator.comparing(Photo::getScore).reversed()) // score 기준 내림차순 정렬
                .map(photo -> String.valueOf(photo.getId())) // photo_id 추출 (String 변환)
                .collect(Collectors.toList());
        response.put("answer",answer);
        response.put("photos", photos);
        return response;
    }

}

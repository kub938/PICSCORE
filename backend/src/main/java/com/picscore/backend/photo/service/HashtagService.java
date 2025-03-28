package com.picscore.backend.photo.service;

import com.picscore.backend.photo.model.entity.Hashtag;
import com.picscore.backend.photo.model.entity.Photo;
import com.picscore.backend.photo.model.entity.PhotoHashtag;
import com.picscore.backend.photo.repository.HashtagRepository;
import com.picscore.backend.photo.repository.PhotoHashtagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HashtagService {
    private final HashtagRepository hashtagRepository;
    private final PhotoHashtagRepository photoHashtagRepository;

    @Transactional
    public void saveHashtags(Photo photo, List<String> hashtags) {
        if (hashtags != null && !hashtags.isEmpty()) {
            for (String tagName : hashtags) {
                Hashtag hashtag = hashtagRepository.findByName(tagName)
                        .orElseGet(() -> hashtagRepository.save(new Hashtag(tagName)));

                photoHashtagRepository.save(new PhotoHashtag(photo, hashtag));
            }
        }
    }
}


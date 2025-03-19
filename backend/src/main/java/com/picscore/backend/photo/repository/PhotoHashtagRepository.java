package com.picscore.backend.photo.repository;

import com.picscore.backend.photo.model.entity.Photo;
import com.picscore.backend.photo.model.entity.PhotoHashtag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotoHashtagRepository extends JpaRepository<PhotoHashtag, Long> {
    List<PhotoHashtag> findByPhotoId(Long photoId); // 특정 사진의 해시태그 목록 조회 메서드
}

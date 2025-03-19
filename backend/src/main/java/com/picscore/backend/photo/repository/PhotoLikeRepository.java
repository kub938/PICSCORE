package com.picscore.backend.photo.repository;

import com.picscore.backend.photo.model.entity.PhotoLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoLikeRepository extends JpaRepository<PhotoLike, Long> {
    int countByPhotoId(Long photoId); // 특정 사진의 좋아요 수를 계산하는 메서드
}

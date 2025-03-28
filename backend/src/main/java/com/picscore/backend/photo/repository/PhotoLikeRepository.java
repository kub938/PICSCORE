package com.picscore.backend.photo.repository;

import com.picscore.backend.photo.model.entity.PhotoLike;
import com.picscore.backend.user.model.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PhotoLikeRepository extends JpaRepository<PhotoLike, Long> {
    int countByPhotoId(Long photoId); // 특정 사진의 좋아요 수를 계산하는 메서드

    Optional<PhotoLike> findByPhotoIdAndUserId(Long photoId, Long userId);

}

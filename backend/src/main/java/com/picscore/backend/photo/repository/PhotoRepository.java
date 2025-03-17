package com.picscore.backend.photo.repository;

import com.picscore.backend.photo.entity.Photo;
import com.picscore.backend.user.model.entity.User;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {

    @Query("SELECT p FROM Photo p JOIN FETCH p.user WHERE p.user.id = :userId")
    List<Photo> findPhotosByUserId(@Param("userId") Long userId);

    // 또는 User 객체를 직접 사용할 수 있습니다.
    @Query("SELECT p FROM Photo p WHERE p.user = :user")
    List<Photo> findPhotosByUser(@Param("user") User user);
}

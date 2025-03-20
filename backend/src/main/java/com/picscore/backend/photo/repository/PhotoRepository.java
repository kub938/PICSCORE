package com.picscore.backend.photo.repository;

import com.picscore.backend.photo.model.entity.Photo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {

    @Query("SELECT p FROM Photo p  WHERE p.user.id = :userId")
    List<Photo> findPhotosByUserId(@Param("userId") Long userId);

    Photo findPhotoById(Long id);
    @Query("SELECT p FROM Photo p  WHERE p.isPublic = true")
    List<Photo> getAllWithoutPublic();

    @Modifying
    @Transactional
    @Query("UPDATE Photo p SET p.isPublic = NOT p.isPublic WHERE p.id = :id")
    void togglePublic(@Param("id") Long id);
}

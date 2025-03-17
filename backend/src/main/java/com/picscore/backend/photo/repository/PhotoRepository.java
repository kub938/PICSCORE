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

    @Query("SELECT p FROM Photo p  WHERE p.user.id = :userId")
    List<Photo> findPhotosByUserId(@Param("userId") Long userId);

}

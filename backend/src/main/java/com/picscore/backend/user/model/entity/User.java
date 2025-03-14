package com.picscore.backend.user.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "user")
public class User {

    @Id
    @Column(name = "id", columnDefinition = "INT UNSIGNED")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "social_id", nullable = false ,length = 20)
    private String socialId;

    @Column(name = "social_type", nullable = false)
    private String socialType;

    @Column(name = "nickname", nullable = true, length = 20)
    private String nickName;

    @Column(name = "profile_image", nullable = true, length = 300)
    private String profileImage;

    @Column(name = "message", nullable = true, length = 30)
    private String message;

    @Column(name = "level", nullable = false)
    private int level;

    @Column(name = "experience", nullable = false)
    private int experience;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}

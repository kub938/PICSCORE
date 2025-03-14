package com.picscore.backend.timeattack;

import com.picscore.backend.photo.entity.Photo;
import com.picscore.backend.user.model.entity.User;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Table(name = "time_attack")
public class TimeAttack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "photo_id")
    private Photo photo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private int activityWeek;
    private int ranking;
    private float score;

    @CreatedDate
    private LocalDateTime createdAt;
}

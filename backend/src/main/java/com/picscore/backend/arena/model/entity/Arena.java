package com.picscore.backend.arena.model.entity;

import com.picscore.backend.user.model.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "arena")
@NoArgsConstructor
public class Arena {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "arena_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "score", nullable = false)
    private int score;

    @Column(name = "activity_week", nullable = false)
    private String activityWeek;


}

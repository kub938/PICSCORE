package com.picscore.backend.badge.model.entity;

import com.picscore.backend.common.model.entity.BaseEntity;
import com.picscore.backend.user.model.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Getter
@NoArgsConstructor
@Table(name = "user_badge")
public class UserBadge extends BaseEntity {

    @Id
    @Column(name = "user_badge_id", columnDefinition = "INT UNSIGNED")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "badge_id", nullable = false)
    private Badge badge;

    public UserBadge(User user, Badge badge) {
        this.user = user;
        this.badge = badge;
    }
}

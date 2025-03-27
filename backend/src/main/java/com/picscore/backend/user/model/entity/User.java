package com.picscore.backend.user.model.entity;

import com.picscore.backend.common.model.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Getter
@NoArgsConstructor
@Table(name = "user")
public class User extends BaseEntity {

    @Id
    @Column(name = "user_id", columnDefinition = "INT UNSIGNED")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "social_id", nullable = false ,length = 50)
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

    public User(String socialId, String socialType, String nickName, String profileImage, String message, int level, int experience) {
        this.socialId = socialId;
        this.socialType = socialType;
        this.nickName = nickName;
        this.profileImage = profileImage;
        this.message = message;
        this.level = level;
        this.experience = experience;
    }

    public void updateProfile(String nickName, String profileImage, String message) {
        this.nickName = nickName;
        this.profileImage = profileImage;
        this.message = message;
    }

    public void updateExperience(int experience) {
        this.experience = experience;
    }

    public void updateLevel(int experience) {
        int level = 0;  // 기본 레벨

        // 경험치를 기반으로 레벨 계산
        int threshold = 1000;  // 첫 번째 레벨 기준 경험치
        int increment = 500;   // 레벨 증가 간격

        while (experience >= threshold) {
            level++;
            threshold += increment;  // 다음 레벨 기준 증가
        }

        this.level = level;
    }

}

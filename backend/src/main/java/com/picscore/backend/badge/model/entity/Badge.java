package com.picscore.backend.badge.model.entity;

import com.picscore.backend.common.model.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@EntityListeners(AuditingEntityListener.class)
@Entity
@Getter
@NoArgsConstructor
@Table(name = "badge")
public class Badge extends BaseEntity {

    @Id
    @Column(name = "badge_id", columnDefinition = "INT UNSIGNED")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "image", nullable = false)
    private String image;

    @Column(name = "obtain_condition", nullable = false)
    private String obtainCondition;

    public Badge(String name, String image, String obtainCondition) {
        this.name = name;
        this.image = image;
        this.obtainCondition = obtainCondition;
    }
}

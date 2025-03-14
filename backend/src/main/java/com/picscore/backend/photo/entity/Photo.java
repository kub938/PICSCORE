package com.picscore.backend.photo.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.picscore.backend.user.model.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Table(name = "photo")
@Getter @Setter
@JsonInclude(JsonInclude.Include.ALWAYS) // null 가능, activity 통한 것은 null 가능
public class Photo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "photo_id")
    @OneToMany(mappedBy = "photo")
    @OneToOne(mappedBy = "photo")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @Column(name = "score", nullable = false)
    private Float score;

    @Column(name = "analysis_chart", columnDefinition = "JSON")
    private String analysisChart;

    @Column(name = "analysis_text", columnDefinition = "JSON")
    private String analysisText;

    @Column(name = "is_public", nullable = false)
    private Boolean isPublic;

    @CreatedDate
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

}

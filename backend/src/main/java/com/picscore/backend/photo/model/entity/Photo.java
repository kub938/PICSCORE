package com.picscore.backend.photo.model.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.picscore.backend.common.model.entity.BaseEntity;
import com.picscore.backend.photo.controller.JsonListConverter;
import com.picscore.backend.photo.controller.JsonMapConverter;
import com.picscore.backend.user.model.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "photo")
@Getter @Setter
@EntityListeners(AuditingEntityListener.class)
@JsonInclude(JsonInclude.Include.ALWAYS) // null 가능, activity 통한 것은 null 가능
public class Photo extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "photo_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    @Column(name = "score", nullable = false)
    private Float score;

    @Column(name = "is_public", nullable = false)
    private Boolean isPublic;

    @Column(name = "photo_type", nullable = false)
    private String photoType;

    @Lob
    @Convert(converter = JsonMapConverter.class) // ✅ JSON 변환기 적용
    @Column(name = "analysis_chart",columnDefinition = "TEXT")
    private Map<String, Integer> analysisChart = new HashMap<>();

    @Lob
    @Convert(converter = JsonListConverter.class) // ✅ JSON 변환기 적용
    @Column(name = "analysis_text", columnDefinition = "Text") // ✅ JSON을 String으로 저장
    private Map<String, List<String>> analysisText = new HashMap<>();

}

package com.picscore.backend.photo.model.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.picscore.backend.common.model.entity.BaseEntity;
import com.picscore.backend.photo.controller.JsonListConverter;
import com.picscore.backend.user.model.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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
    @Column(name = "analysis_chart", columnDefinition = "Text")// ✅ JSON을 String으로 저장
    private Map<String, Integer> analysisChart;

    @Lob
    @Convert(converter = JsonListConverter.class) // ✅ JSON 변환기 적용
    @Column(name = "analysis_text", columnDefinition = "Text") // ✅ JSON을 String으로 저장
    private Map<String, List<String>> analysisText;
//
//    public void setAnalysisChart(Map<String, Integer> chart) {
//        this.analysisChart = convertToJson(chart);
//    }
//
//    public void setAnalysisText(Map<String, Object> text) {
//        this.analysisText = convertToJson(text);
//    }
//
//    private String convertToJson(Object obj) {
//        try {
//            return new ObjectMapper().writeValueAsString(obj);
//        } catch (JsonProcessingException e) {
//            throw new RuntimeException("JSON 변환 오류", e);
//        }
//    }



//    관계된 컬렉션 없이 한번 해보자
//    @OneToMany(mappedBy = "photo")
//    private List<PhotoHashtag> photoHashtags = new ArrayList<>();

//    @OneToMany(mappedBy = "photo")
//    private List<PhotoLike> photoLikes = new ArrayList<>();
}

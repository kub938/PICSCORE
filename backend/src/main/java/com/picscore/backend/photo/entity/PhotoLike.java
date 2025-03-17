//package com.picscore.backend.photo.entity;
//
//import com.picscore.backend.user.model.entity.User;
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.Setter;
//import org.springframework.data.annotation.CreatedDate;
//
//import java.time.LocalDateTime;
//
//@Entity
//@Table(name = "photo_like")
//@Getter @Setter
//public class PhotoLike {
//    @Id
//    @GeneratedValue
//    @Column(name = "photo_like_id")
//    private Long id;
//
//    @ManyToOne
//    @JoinColumn(name = "photo_id")
//    private Photo photo;
//
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;
//
//    @CreatedDate
//    @Column(name = "created_at", nullable = false)
//    private LocalDateTime createdAt;
//}

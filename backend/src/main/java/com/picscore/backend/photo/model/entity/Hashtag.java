package com.picscore.backend.photo.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "hashtag")
public class Hashtag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hashtag_id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;
//    관계된 컬렉션 없이 한번 해보자
//    @OneToMany(mappedBy = "hashtag")
//    private List<PhotoHashtag> photoHashtags = new ArrayList<>();
}

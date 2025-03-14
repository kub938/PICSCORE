package com.picscore.backend.photo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "hashtag")
public class Hashtag {
    @Id @GeneratedValue
    @Column(name = "hashtag_id")
    private Long id;

    private String name;
}

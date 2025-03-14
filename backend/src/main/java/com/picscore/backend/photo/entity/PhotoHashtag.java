package com.picscore.backend.photo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "photo_hashtag")
@Getter @Setter
public class PhotoHashtag {

    @Id @GeneratedValue
    @Column(name = "photo_hashtag_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "hashtag_id")
    private Hashtag hashtag;

    @ManyToOne
    @JoinColumn(name = "photo_id")
    private Photo photo;
}

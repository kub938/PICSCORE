package com.picscore.backend.user.model.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserDto {

    private String socialId;
    private String socialType;
    private String nickName;
    private String profileImage;
    private String message;
    private int level;
    private int experience;
    private String role;
}

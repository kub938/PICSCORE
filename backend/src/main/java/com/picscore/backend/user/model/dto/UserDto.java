package com.picscore.backend.user.model.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserDto {

    private String nickName;
    private String role;
}

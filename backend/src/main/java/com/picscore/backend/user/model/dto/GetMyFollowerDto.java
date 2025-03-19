package com.picscore.backend.user.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetMyFollowerDto {

    private Long userId;
    private String profileImage;
    private String nickName;
    private Boolean isFollowing;
}

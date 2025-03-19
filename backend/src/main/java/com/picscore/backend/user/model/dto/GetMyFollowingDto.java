package com.picscore.backend.user.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetMyFollowingDto {

    private Long userId;
    private String profile_image;
    private String nickname;
}

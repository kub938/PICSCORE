package com.picscore.backend.badge.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProfileBadgeDto {

    private Long badgeId;
    private String badgeName;
    private String badgeImage;
}

package com.picscore.backend.user.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SearchUsersResponse {

    private Long userId;
    private String profileImage;
    private String nickName;
    private String message;
}

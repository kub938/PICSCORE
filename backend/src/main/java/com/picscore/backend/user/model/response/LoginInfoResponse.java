package com.picscore.backend.user.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginInfoResponse {
    private Long userId;
    private String nickname;
    private String accessToken;
}

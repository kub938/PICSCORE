package com.picscore.backend.user.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateMyProfileRequest {

    private String profileImage;
    private String nickName;
    private String message;
}

package com.picscore.backend.user.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ToggleFollowRequest {

    private Long followingId;
}

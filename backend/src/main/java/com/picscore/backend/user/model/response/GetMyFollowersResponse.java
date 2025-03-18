package com.picscore.backend.user.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class GetMyFollowersResponse {

    private List<GetMyFollowerResponse> followers;

}

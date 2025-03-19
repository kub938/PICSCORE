package com.picscore.backend.user.model.response;

import com.picscore.backend.user.model.dto.GetMyFollowingDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class GetMyFollowingsResponse {

    private List<GetMyFollowingDto> followings;
}

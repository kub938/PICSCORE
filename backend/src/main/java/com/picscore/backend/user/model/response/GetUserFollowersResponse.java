package com.picscore.backend.user.model.response;

import com.picscore.backend.user.model.dto.GetUserFollowerDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class GetUserFollowersResponse {

    private List<GetUserFollowerDto> followers;
}

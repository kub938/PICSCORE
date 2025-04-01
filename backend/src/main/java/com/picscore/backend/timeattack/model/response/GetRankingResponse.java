package com.picscore.backend.timeattack.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetRankingResponse {

    private Long userId;
    private String nickName;
    private String profileImage;
    private String imageUrl;
    private String topic;
    private float score;
    private int rank;
}

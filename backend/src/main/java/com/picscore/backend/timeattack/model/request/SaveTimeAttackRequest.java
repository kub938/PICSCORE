package com.picscore.backend.timeattack.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SaveTimeAttackRequest {

    private String imageName;
    private String topic;
    private Float score;
}

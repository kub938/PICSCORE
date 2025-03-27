package com.picscore.backend.timeattack.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AnalysisPhotoResponse {

    private String name;
    private float confidence;
    private float score;
}

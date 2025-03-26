package com.picscore.backend.timeattack.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AnalysisPhotoRequest {

    private byte[] imageFileBytes;
    private String topic;
}

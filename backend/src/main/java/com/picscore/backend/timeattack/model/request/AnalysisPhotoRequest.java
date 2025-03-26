package com.picscore.backend.timeattack.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
public class AnalysisPhotoRequest {

    private MultipartFile imageFile;
    private String topic;
}

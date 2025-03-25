package com.picscore.backend.timeattack.model.response;

import lombok.Data;

import java.util.List;

@Data
public class AzureVisionResponse {
    private List<Tag> tags;

    @Data
    public static class Tag {
        private String name;
        private float confidence;
    }
}

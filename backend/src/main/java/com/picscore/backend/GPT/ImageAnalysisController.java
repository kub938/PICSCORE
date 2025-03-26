package com.picscore.backend.GPT;

import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/image")
public class ImageAnalysisController {

    private final OpenAiImageService openAiImageService;

    public ImageAnalysisController(OpenAiImageService openAiImageService) {
        this.openAiImageService = openAiImageService;
    }

    @GetMapping("/analyze")
    public String analyze(@RequestParam String imageUrl) throws IOException {
        return openAiImageService.analyzeImage(imageUrl);
    }
}



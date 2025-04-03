package com.picscore.backend.arena.controller;

import com.picscore.backend.arena.model.ResultArenaRequest;
import com.picscore.backend.arena.service.ArenaService;
import com.picscore.backend.common.model.response.BaseResponse;
import com.picscore.backend.photo.model.request.UploadPhotoRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v2/arena")
public class ArenaController {

    final private ArenaService arenaService;
    @GetMapping("/random")
    public ResponseEntity<BaseResponse<Map<String,Object>>> getRandomPhotos () {
        return ResponseEntity.ok(BaseResponse.success("추출완료",arenaService.randomPhotos()));
    }

    @PostMapping("/result")
    public ResponseEntity<BaseResponse<Map<String,Object>>> arenaResult (@RequestBody ResultArenaRequest payload) {

        return ResponseEntity.ok(BaseResponse.success("추출완료",arenaService.calculateArena(payload.getCorrect(), payload.getTime())));
    }

}

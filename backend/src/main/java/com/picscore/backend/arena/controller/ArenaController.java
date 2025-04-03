package com.picscore.backend.arena.controller;

import com.picscore.backend.arena.service.ArenaService;
import com.picscore.backend.common.model.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v2/arena")
public class ArenaController {

    final private ArenaService arenaService;
    @GetMapping("/random")
    public ResponseEntity<BaseResponse<Map<String,Object>>> getRandomPhotos () {
//        Map<String, Object> response = new HashMap<>();
//        response = arenaService.randomPhotos();
        return ResponseEntity.ok(BaseResponse.success("추출완료",arenaService.randomPhotos()));
    }

}

package com.picscore.backend.timeattack.controller;

import com.picscore.backend.common.model.response.BaseResponse;
import com.picscore.backend.timeattack.service.TimeAttackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * TimeAttack 관련 API를 처리하는 컨트롤러
 */
@RestController
@RequestMapping("/api/v1/activity")
@RequiredArgsConstructor
public class TimeAttackController {

    private final TimeAttackService timeAttackService;


    /**
     * TimeAttack 랭킹을 조회하는 API 엔드포인트
     *
     * @param pageNum 조회할 페이지 번호 (1부터 시작)
     * @return ResponseEntity<BaseResponse<Map<String, Object>>> 랭킹 정보를 포함한 응답
     */
    @GetMapping("/time-attack/{pageNum}")
    public ResponseEntity<BaseResponse<Map<String, Object>>> getRanking(
            @PathVariable int pageNum
    ) {
        // TimeAttackService의 getRanking 메소드를 호출하여 랭킹 정보를 조회하고 반환
        return timeAttackService.getRanking(pageNum);
    }
}


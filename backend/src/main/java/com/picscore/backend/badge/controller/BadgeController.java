package com.picscore.backend.badge.controller;

import com.picscore.backend.badge.model.request.TimeAttackScoreRequest;
import com.picscore.backend.badge.model.response.GetBadgeResponse;
import com.picscore.backend.badge.service.BadgeService;
import com.picscore.backend.common.model.response.BaseResponse;
import com.picscore.backend.user.service.OAuthService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 배지 관련 API를 처리하는 컨트롤러
 */
@RestController
@RequestMapping("/api/v1/badge")
@RequiredArgsConstructor
public class BadgeController {

    private final OAuthService oAuthService;
    private final BadgeService badgeService;


    /**
     * 사용자의 배지 정보를 조회하는 엔드포인트
     *
     * @param request HTTP 요청 객체
     * @return ResponseEntity<BaseResponse < List < GetBadgeResponse>>> 사용자의 배지 목록을 포함한 응답
     */
    @GetMapping("/")
    public ResponseEntity<BaseResponse<List<GetBadgeResponse>>> getBadge(HttpServletRequest request) {
        // 요청에서 사용자 ID를 추출
        Long userId = oAuthService.findIdByNickName(request);

        // 배지 서비스를 통해 사용자의 배지 정보를 조회하고 반환
        return badgeService.getBadge(userId);
    }

    @PostMapping("/time-attack/score")
    public ResponseEntity<BaseResponse<Void>> GetTimeAttackScore(
            HttpServletRequest request, TimeAttackScoreRequest timeAttackScoreRequest
    ) {

        Long userId = oAuthService.findIdByNickName(request);

        return badgeService.getTimeAttackScore(userId, timeAttackScoreRequest);
    }
}


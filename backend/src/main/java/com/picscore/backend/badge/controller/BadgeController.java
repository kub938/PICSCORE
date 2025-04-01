package com.picscore.backend.badge.controller;

import com.picscore.backend.badge.model.request.TimeAttackScoreRequest;
import com.picscore.backend.badge.model.response.GetBadgeResponse;
import com.picscore.backend.badge.service.BadgeService;
import com.picscore.backend.common.model.response.BaseResponse;
import com.picscore.backend.user.service.OAuthService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("")
    public ResponseEntity<BaseResponse<List<GetBadgeResponse>>> getBadge(
            HttpServletRequest request) {

        Long userId = oAuthService.findIdByNickName(request);
        List<GetBadgeResponse> getBadgeResponseList = badgeService.getBadge(userId);

        return ResponseEntity.ok(BaseResponse.success("전체 뱃지 목록 조회", getBadgeResponseList));
    }


    /**
     * 타임 어택 점수에 따라 뱃지를 획득하거나 상태를 반환하는 API
     *
     * @param request 클라이언트 요청 객체 (사용자 인증 정보를 포함)
     * @param timeAttackScoreRequest 타임 어택 점수 요청 객체 (점수 정보를 포함)
     * @return ResponseEntity<BaseResponse<Void>> 결과 메시지를 포함한 응답 객체
     */
    @PostMapping("/time-attack/score")
    public ResponseEntity<BaseResponse<Void>> getTimeAttackScore(
            HttpServletRequest request,
            @RequestBody TimeAttackScoreRequest timeAttackScoreRequest) {

        Long userId = oAuthService.findIdByNickName(request);
        String resultMessage = badgeService.getTimeAttackScore(userId, timeAttackScoreRequest);

        return ResponseEntity.ok(BaseResponse.withMessage(resultMessage));
    }
}


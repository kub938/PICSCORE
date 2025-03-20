package com.picscore.backend.badge.controller;

import com.picscore.backend.badge.model.response.GetBadgeResponse;
import com.picscore.backend.badge.service.BadgeService;
import com.picscore.backend.common.model.response.BaseResponse;
import com.picscore.backend.user.service.OAuthService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class BadgeController {

    private final OAuthService oAuthService;
    private final BadgeService badgeService;

    @GetMapping("/badge")
    public ResponseEntity<BaseResponse<List<GetBadgeResponse>>> getBadge(HttpServletRequest request) {

        Long userId = oAuthService.findIdByNickName(request);

        return badgeService.getBadge(userId);
    }
}

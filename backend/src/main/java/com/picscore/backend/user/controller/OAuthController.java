package com.picscore.backend.user.controller;

import com.picscore.backend.common.model.response.BaseResponse;
import com.picscore.backend.user.model.response.ReissueResponse;
import com.picscore.backend.user.service.OAuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class OAuthController {

    private final OAuthService oAuthService;

    /**
     * Google 로그인 페이지로 리다이렉트합니다.
     *
     * @param response HTTP 응답 객체
     * @throws IOException 리다이렉트 중 발생할 수 있는 입출력 예외
     */
    @GetMapping("/user")
    public void redirectToGoogleLogin(HttpServletResponse response) throws IOException {
        response.sendRedirect("/oauth2/authorization/google");
    }

    /**
     * 토큰을 재발급합니다.
     *
     * @param request HTTP 요청 객체
     * @param response HTTP 응답 객체
     * @return 재발급된 토큰 정보를 포함한 ResponseEntity
     */
    @PostMapping("/reissue")
    public ResponseEntity<BaseResponse<ReissueResponse>> reissue(HttpServletRequest request, HttpServletResponse response) {
        return oAuthService.reissue(request, response);
    }
}


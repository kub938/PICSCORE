package com.picscore.backend.user.controller;

import com.picscore.backend.common.model.response.BaseResponse;
import com.picscore.backend.user.model.response.ReissueResponse;
import com.picscore.backend.user.service.OAuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        System.out.println("과연1");
        response.sendRedirect("/oauth2/authorization/google");
    }

    @DeleteMapping("/user")
    public ResponseEntity<BaseResponse<Void>> deleteUser(
            HttpServletRequest request, HttpServletResponse response
    ) {

        Long userId = oAuthService.findIdByNickName(request);

        return oAuthService.deleteUser(userId, response);
    }
}


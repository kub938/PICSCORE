package com.picscore.backend.user.controller;

import com.picscore.backend.common.model.response.BaseResponse;
import com.picscore.backend.user.jwt.JWTUtil;
import com.picscore.backend.user.model.response.LoginInfoResponse;
import com.picscore.backend.user.repository.UserRepository;
import com.picscore.backend.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

/**
 * 사용자 관련 API를 처리하는 컨트롤러
 * - 사용자 정보 조회
 * - 로그아웃 처리
 */
@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final JWTUtil jwtUtil;
    private final UserService userService;

    /**
     * 현재 로그인한 사용자의 정보를 반환합니다.
     *
     * 이 API는 요청의 쿠키에서 액세스 토큰을 추출하여 사용자 정보를 조회합니다.
     *
     * @param request HTTP 요청 객체 (쿠키에서 토큰 추출)
     * @return ResponseEntity<BaseResponse<UserLoginResponse>>
     *         - 사용자 정보를 포함하는 응답 객체
     */
    @GetMapping("/info")
    public ResponseEntity<BaseResponse<LoginInfoResponse>> LoginInfo(HttpServletRequest request) {
        return userService.LoginInfo(request);
    }

    /**
     * 사용자 로그아웃을 처리합니다.
     *
     * 이 API는 클라이언트를 로그아웃 페이지로 리다이렉트하고,
     * 로그아웃 완료 메시지를 반환합니다.
     *
     * @param response HTTP 응답 객체
     * @return ResponseEntity<BaseResponse<Void>>
     *         - 로그아웃 완료 메시지를 포함하는 응답 객체
     * @throws IOException 리다이렉트 중 발생할 수 있는 입출력 예외
     */
    @GetMapping("/logout")
    public ResponseEntity<BaseResponse<Void>> redirectToGoogleLogin(HttpServletResponse response) throws IOException {
        response.sendRedirect("/logout");
        BaseResponse<Void> baseResponse = BaseResponse.withMessage("로그아웃 완료");
        return ResponseEntity.ok(baseResponse);
    }
}

package com.picscore.backend.user.controller;

import com.picscore.backend.common.model.response.BaseResponse;
import com.picscore.backend.user.jwt.JWTUtil;
import com.picscore.backend.user.model.response.UserLoginResponse;
import com.picscore.backend.user.repository.UserRepository;
import com.picscore.backend.user.service.UserLoginService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final JWTUtil jwtUtil;
    private final UserLoginService userLoginService;

    /**
     * 현재 로그인한 사용자의 정보를 반환하는 API (쿠키에서 토큰 가져와서 처리)
     */
    @GetMapping("/info")
    public ResponseEntity<BaseResponse<UserLoginResponse>> getUserInfo(HttpServletRequest request) {
        return userLoginService.getUserInfo(request);
    }


}

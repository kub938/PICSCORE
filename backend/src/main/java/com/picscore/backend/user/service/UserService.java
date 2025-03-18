package com.picscore.backend.user.service;

import com.picscore.backend.common.model.response.BaseResponse;
import com.picscore.backend.user.jwt.JWTUtil;
import com.picscore.backend.user.model.entity.User;
import com.picscore.backend.user.model.response.GetMyFollowersResponse;
import com.picscore.backend.user.model.response.LoginInfoResponse;
import com.picscore.backend.user.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

/**
 * 사용자 관련 서비스를 제공하는 클래스
 * - 로그인 정보 조회
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JWTUtil jwtUtil;

    /**
     * 현재 로그인한 사용자의 정보를 가져오는 메서드
     *
     * @param request HTTP 요청 객체 (쿠키에서 AccessToken 추출)
     * @return ResponseEntity<BaseResponse<LoginInfoResponse>>
     *         - 로그인 정보를 포함하는 응답 객체
     */
    public ResponseEntity<BaseResponse<LoginInfoResponse>> LoginInfo(HttpServletRequest request) {
        // 쿠키에서 AccessToken 찾기
        Optional<Cookie> accessTokenCookie = Arrays.stream(request.getCookies())
                .filter(cookie -> "access".equals(cookie.getName()))
                .findFirst();

        // AccessToken 쿠키가 없는 경우
        if (accessTokenCookie.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(BaseResponse.error("AccessToken 쿠키 없음"));
        }

        // JWT에서 닉네임(유저 식별자) 추출
        String accessToken = accessTokenCookie.get().getValue();
        String nickName = jwtUtil.getNickName(accessToken);

        // 유효하지 않은 토큰인 경우
        if (nickName == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(BaseResponse.error("유효하지 않은 토큰"));
        }

        // 닉네임으로 사용자 조회
        User user = userRepository.findByNickName(nickName);
        // 사용자를 찾을 수 없는 경우
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(BaseResponse.error("사용자를 찾을 수 없음"));
        }

        // 유저 정보 + 토큰 반환
        LoginInfoResponse response = new LoginInfoResponse(user.getId(), user.getNickName(), accessToken);
        return ResponseEntity.ok(BaseResponse.success("로그인 성공", response));
    }
}

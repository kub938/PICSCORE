package com.picscore.backend.user.jwt;

import com.picscore.backend.user.model.dto.CustomOAuth2User;
import com.picscore.backend.user.model.dto.UserDto;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;

@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    /**
     * JWT 토큰을 검증하고 인증 처리를 수행하는 필터 메서드입니다.
     *
     * @param request HTTP 요청
     * @param response HTTP 응답
     * @param filterChain 필터 체인
     * @throws ServletException 서블릿 예외
     * @throws IOException 입출력 예외
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // 쿠키에서 액세스 토큰 추출
        String accessToken = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("access")) {
                    accessToken = cookie.getValue();
                    break;
                }
            }
        }
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            accessToken = authorizationHeader.substring(7); // "Bearer " 이후의 토큰을 추출
        }


        // 액세스 토큰이 없으면 다음 필터로 진행
        if (accessToken == null) {
            System.out.println("accessToken null");
            filterChain.doFilter(request, response);
            return;
        }

        try {
            // 토큰 만료 검증
            jwtUtil.isExpired(accessToken);
        } catch (ExpiredJwtException e) {
            // 토큰 만료 시 응답 처리
            response.setContentType("text/plain");
            response.getWriter().write("access token expired");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // 토큰 카테고리 검증
        String category = jwtUtil.getCategory(accessToken);
        if (!category.equals("access")) {
            response.setContentType("text/plain");
            response.getWriter().write("invalid access token");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // 토큰에서 사용자 정보 추출
        String nickName = jwtUtil.getNickName(accessToken);
        String role = jwtUtil.getRole(accessToken);

        // UserDto 생성 및 설정
        UserDto userDto = new UserDto();
        userDto.setNickName(nickName);
        userDto.setRole(role);

        // CustomOAuth2User 객체 생성
        CustomOAuth2User customOAuth2User = new CustomOAuth2User(userDto);

        // 인증 객체 생성 및 SecurityContext에 설정
        Authentication authToken = new UsernamePasswordAuthenticationToken(customOAuth2User, null, customOAuth2User.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}


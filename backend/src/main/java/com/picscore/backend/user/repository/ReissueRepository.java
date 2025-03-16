package com.picscore.backend.user.repository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Repository;

@Repository
public class ReissueRepository {

    /**
     * HTTP 요청의 쿠키에서 리프레시 토큰을 추출합니다.
     *
     * @param request HTTP 서블릿 요청 객체
     * @return 리프레시 토큰 값, 없으면 null
     */
    public String getRefreshTokenFromCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refresh".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}



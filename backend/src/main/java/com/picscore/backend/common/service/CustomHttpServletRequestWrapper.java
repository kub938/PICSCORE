package com.picscore.backend.common.service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;

import java.util.*;

public class CustomHttpServletRequestWrapper extends HttpServletRequestWrapper {
    private final Map<String, String> customHeaders = new HashMap<>();
    private Cookie[] customCookies;

    public CustomHttpServletRequestWrapper(HttpServletRequest request) {
        super(request);
        this.customCookies = request.getCookies(); // 기존 쿠키 복사
    }

    // 헤더 추가 메서드
    public void addHeader(String name, String value) {
        customHeaders.put(name, value);
    }

    // 쿠키 업데이트 메서드
    public void updateCookie(String name, String value) {
        List<Cookie> updatedCookies = new ArrayList<>();

        // 기존 쿠키 목록에서 동일한 이름의 쿠키를 새로운 값으로 변경
        boolean found = false;
        if (customCookies != null) {
            for (Cookie cookie : customCookies) {
                if (cookie.getName().equals(name)) {
                    cookie.setValue(value);
                    found = true;
                }
                updatedCookies.add(cookie);
            }
        }

        // 기존 쿠키에 없었다면 새 쿠키 추가
        if (!found) {
            updatedCookies.add(new Cookie(name, value));
        }

        // 업데이트된 쿠키 리스트를 적용
        customCookies = updatedCookies.toArray(new Cookie[0]);
    }

    @Override
    public String getHeader(String name) {
        // 새로 설정한 헤더가 있으면 반환, 없으면 기존 헤더 반환
        return customHeaders.getOrDefault(name, super.getHeader(name));
    }

    @Override
    public Enumeration<String> getHeaderNames() {
        List<String> headerNames = new ArrayList<>(customHeaders.keySet());
        Enumeration<String> originalHeaderNames = super.getHeaderNames();

        while (originalHeaderNames.hasMoreElements()) {
            headerNames.add(originalHeaderNames.nextElement());
        }

        return Collections.enumeration(headerNames);
    }

    @Override
    public Cookie[] getCookies() {
        return customCookies;
    }
}

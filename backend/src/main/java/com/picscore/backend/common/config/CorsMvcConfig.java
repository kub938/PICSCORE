package com.picscore.backend.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsMvcConfig implements WebMvcConfigurer {

    /**
     * CORS 설정을 추가합니다.
     *
     * @param corsRegistry CORS 설정을 등록하는 객체
     */
    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {
        corsRegistry.addMapping("/**") // 모든 경로에 대해 CORS 설정 적용
                .exposedHeaders("Set-Cookie") // 클라이언트에서 "Set-Cookie" 헤더를 접근 가능하도록 설정
                .allowedOrigins("http://localhost:5173", "https://j12b104.p.ssafy.io"); // 허용할 Origin 설정
    }
}

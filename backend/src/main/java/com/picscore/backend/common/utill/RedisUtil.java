package com.picscore.backend.common.utill;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
public class RedisUtil {

    private final RedisTemplate<String, Object> redisTemplate;

    // 일반 키-값 저장 (SETEX 기능)
    public void setex(String key, Object value, long seconds) {
        redisTemplate.opsForValue().set(key, value, seconds, TimeUnit.SECONDS);
    }

    // 키 남은 만료 시간 조회
    public Long getTtl(String key) {
        return redisTemplate.getExpire(key);
    }

    // 일반 키로 값 조회
    public Object get(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    // 키 존재 여부 확인
    public Boolean exists(String key) {
        return redisTemplate.hasKey(key);
    }
}

package com.picscore.backend.photo.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

@Converter(autoApply = true)
public class JsonListConverter implements AttributeConverter<Map<String, List<String>>, String> {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Map<String, List<String>> attribute) {
        if (attribute == null || attribute.isEmpty()) {
            return "{}"; // ✅ 빈 JSON 문자열로 저장
        }
        try {
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("JSON 변환 오류", e);
        }
    }

    @Override
    public Map<String, List<String>> convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.trim().isEmpty()) {
            return new HashMap<>(); // ✅ 빈 맵 반환
        }
        try {
            return objectMapper.readValue(dbData, new TypeReference<>() {});
        } catch (IOException e) {
            e.printStackTrace(); // ✅ 디버깅을 위한 로그 출력
            return new HashMap<>(); // ✅ 변환 실패 시에도 빈 맵 반환
        }
    }
}




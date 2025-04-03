package com.picscore.backend.arena.service;

import com.picscore.backend.arena.model.ArenaPhotoResponse;
import com.picscore.backend.arena.model.entity.Arena;
import com.picscore.backend.arena.repository.ArenaRepository;
import com.picscore.backend.photo.model.entity.Photo;
import com.picscore.backend.photo.repository.PhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.IsoFields;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ArenaService {

    final private PhotoRepository photoRepository;
    final private ArenaRepository arenaRepository;
    @Transactional
    public Map<String, Object> randomPhotos () {
        Map<String, Object> response = new HashMap<>();
        // 랜덤이미지 4장
        // is_public=true, score 일치X
        List<Object[]> photos = photoRepository.getRandomPublicPhotos();

        if (photos.size() < 4) {
            throw new IllegalStateException("조건에 맞는 사진이 충분하지 않습니다.");
        }

        List<Long> answer = photos.stream()
                .map(photo -> new ArenaPhotoResponse(
                        ((Number) photo[0]).longValue(),  // photo_id
                        ((Number) photo[1]).intValue(),   // score
                        (String) photo[2]                 // image_url
                ))
                .sorted(Comparator.comparing(ArenaPhotoResponse::getScore).reversed()) // score 기준 내림차순 정렬
                .map(photo -> photo.getPhotoId()) // photo_id 추출
                .collect(Collectors.toList());
        response.put("answer",answer);
        response.put("photos", photos);
        return response;
    }

    public Map<String, Object> calculateArena(int correct, String time) {
        String activityWeek = getCurrentGameWeek();
        float Ftime = 20f;
        Ftime = Float.parseFloat(time);
        final float adjustedTime = Ftime / 18f;
        // 🎯 기존 데이터 조회
        Arena arena = arenaRepository.findByUserIdAndActivityWeek(userId, activityWeek)
                .orElseGet(() -> {
                    // 데이터가 없으면 새 엔티티 생성
                    Arena newArena = new Arena();
                    newArena.setUserId(userId);
                    newArena.setActivityWeek(activityWeek);
                    newArena.setScore(0); // 초기 점수 0
                    return arenaRepository.save(newArena);
                });
        // ✅ 정답이 4개라면 점수 증가
        if (correct == 4) {
            arena.setScore(arena.getScore() + 1);
        }

        // 📊 경험치 계산
        double experience = (correct * 10 * 0.7) + ((double) timeValue / 18 * 0.3);

        return experience;
    }
    // ✅ 현재 주차의 게임 ID 가져오기
    public String getCurrentGameWeek() {
        LocalDate now = LocalDate.now(ZoneId.of("UTC"));
        int year = now.getYear();
        int week = now.get(IsoFields.WEEK_OF_WEEK_BASED_YEAR);
        return String.format("%d%02d", year, week);
    }
}

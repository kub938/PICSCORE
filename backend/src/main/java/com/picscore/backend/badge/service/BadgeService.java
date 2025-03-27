package com.picscore.backend.badge.service;

import com.picscore.backend.badge.model.entity.Badge;
import com.picscore.backend.badge.model.entity.UserBadge;
import com.picscore.backend.badge.model.request.TimeAttackScoreRequest;
import com.picscore.backend.badge.model.response.GetBadgeResponse;
import com.picscore.backend.badge.repository.BadgeRepository;
import com.picscore.backend.badge.repository.UserBadgeRepository;
import com.picscore.backend.common.model.response.BaseResponse;
import com.picscore.backend.user.model.entity.User;
import com.picscore.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 배지 관련 비즈니스 로직을 처리하는 서비스 클래스
 */
@Service
@RequiredArgsConstructor
public class BadgeService {

    private final BadgeRepository badgeRepository;
    private final UserBadgeRepository userBadgeRepository;
    private final UserRepository userRepository;


    /**
     * 사용자의 배지 정보를 조회하는 메서드
     *
     * @param userId 조회할 사용자의 ID
     * @return ResponseEntity<BaseResponse<List<GetBadgeResponse>>> 사용자의 배지 목록을 포함한 응답
     */
    public ResponseEntity<BaseResponse<List<GetBadgeResponse>>> getBadge(Long userId) {
        // 모든 배지 정보를 조회
        List<Badge> badgeList = badgeRepository.findAll();

        // 각 배지에 대해 사용자의 획득 여부를 확인하고 응답 객체로 변환
        List<GetBadgeResponse> response =
                badgeList.stream()
                        .map(badge -> {
                            // 사용자가 해당 배지를 획득했는지 확인
                            boolean isObtain = userBadgeRepository.existsByUserIdAndBadgeId(
                                    userId, badge.getId()
                            );
                            // 배지 정보와 획득 여부를 포함한 응답 객체 생성
                            return new GetBadgeResponse(
                                    badge.getId(),
                                    badge.getName(),
                                    badge.getImage(),
                                    badge.getObtainCondition(),
                                    isObtain
                            );
                        })
                        .collect(Collectors.toList());

        // 성공 응답 반환
        return ResponseEntity.ok(BaseResponse.success("전체 뱃지 목록 조회", response));
    }

    public ResponseEntity<BaseResponse<Void>> getTimeAttackScore(
            Long userId, TimeAttackScoreRequest request
    ) {

        if (request.getScore() >= 90) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

            Badge badge = badgeRepository.findById(1L)
                    .orElseThrow(() -> new IllegalArgumentException("User not found with ID: 1"));

            UserBadge userBadge = new UserBadge(user, badge);
            userBadgeRepository.save(userBadge);

            return ResponseEntity.ok(BaseResponse.withMessage("타임 어택 점수 뱃지 달성"));
        }

        return ResponseEntity.ok(BaseResponse.withMessage("타임 어택 점수 뱃지 미달성"));
    }
}


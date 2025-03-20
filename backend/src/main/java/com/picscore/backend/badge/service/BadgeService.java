package com.picscore.backend.badge.service;

import com.picscore.backend.badge.model.entity.Badge;
import com.picscore.backend.badge.model.response.GetBadgeResponse;
import com.picscore.backend.badge.repository.BadgeRepository;
import com.picscore.backend.badge.repository.UserBadgeRepository;
import com.picscore.backend.common.model.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BadgeService {

    private final BadgeRepository badgeRepository;
    private final UserBadgeRepository userBadgeRepository;

    public ResponseEntity<BaseResponse<List<GetBadgeResponse>>> getBadge(Long userId) {

        List<Badge> badgeList = badgeRepository.findAll();

        List<GetBadgeResponse> response =
                badgeList.stream()
                        .map(badge -> {
                            boolean isObtain = userBadgeRepository.existsByUserIdAndBadgeId(
                                    userId, badge.getId()
                            );
                            return new GetBadgeResponse(
                                    badge.getId(),
                                    badge.getName(),
                                    badge.getImage(),
                                    badge.getObtainCondition(),
                                    isObtain
                            );
                        })
                        .collect(Collectors.toList());

        return ResponseEntity.ok(BaseResponse.success("전체 뱃지 목록 조회", response));
    }
}

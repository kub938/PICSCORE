package com.picscore.backend.user.service;

import com.picscore.backend.badge.model.dto.ProfileBadgeDto;
import com.picscore.backend.badge.model.entity.Badge;
import com.picscore.backend.badge.model.entity.UserBadge;
import com.picscore.backend.badge.repository.UserBadgeRepository;
import com.picscore.backend.common.model.response.BaseResponse;
import com.picscore.backend.common.utill.RedisUtil;
import com.picscore.backend.timeattack.model.entity.TimeAttack;
import com.picscore.backend.timeattack.model.response.GetMyStaticResponse;
import com.picscore.backend.timeattack.repository.TimeAttackRepository;
import com.picscore.backend.user.jwt.JWTUtil;
import com.picscore.backend.user.model.entity.User;
import com.picscore.backend.user.model.request.UpdateMyProfileRequest;
import com.picscore.backend.user.model.response.GetMyProfileResponse;
import com.picscore.backend.user.model.response.GetUserProfileResponse;
import com.picscore.backend.user.model.response.LoginInfoResponse;
import com.picscore.backend.user.model.response.SearchUsersResponse;
import com.picscore.backend.user.repository.FollowRepository;
import com.picscore.backend.user.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * 사용자 관련 서비스를 제공하는 클래스
 * - 로그인 정보 조회
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final FollowRepository followRepository;
    private final UserBadgeRepository userBadgeRepository;
    private final TimeAttackRepository timeAttackRepository;
    private final JWTUtil jwtUtil;
    private final RedisUtil redisUtil;

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

    /**
     * 사용자 검색 기능을 제공하는 메서드
     *
     * @param searchText 검색할 닉네임 텍스트
     * @return ResponseEntity<BaseResponse<List<SearchUsersResponse>>> 검색된 사용자 목록을 포함한 응답
     */
    public ResponseEntity<BaseResponse<List<SearchUsersResponse>>> searchUser(String searchText) {

        // 1. 주어진 검색어로 시작하는 닉네임을 가진 사용자들을 데이터베이스에서 조회
        List<User> userList = userRepository.findByNickNameContaining(searchText);

        // 2. 조회된 사용자 목록을 SearchUsersResponse DTO로 변환
        List<SearchUsersResponse> response =
                userList.stream() // 스트림 생성
                        .map(user -> { // 각 User 객체를 SearchUsersResponse로 변환
                            return new SearchUsersResponse(
                                    user.getId(), // 사용자 ID
                                    user.getProfileImage(), // 프로필 이미지 URL
                                    user.getNickName(), // 닉네임
                                    user.getMessage() // 상태 메시지
                            );
                        })
                        .collect(Collectors.toList()); // 변환된 객체들을 리스트로 수집

        // 3. 성공 응답 생성 및 반환
        return ResponseEntity.ok(BaseResponse.success("친구 검색 성공", response));
    }

    public ResponseEntity<BaseResponse<GetMyProfileResponse>> getMyProfile(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        int followerCnt = followRepository.countByFollowingId(userId);
        int followingCnt = followRepository.countByFollowerId(userId);

        List<UserBadge> userBadgeList = userBadgeRepository.findByUserId(userId);
        List<ProfileBadgeDto> profileBadgeList =
                userBadgeList.stream()
                        .map(userBadge -> {
                            Badge badge = userBadge.getBadge();
                            return new ProfileBadgeDto(
                                    badge.getId(),
                                    badge.getName(),
                                    badge.getImage()
                            );
                        })
                        .collect(Collectors.toList());

        GetMyProfileResponse response = new GetMyProfileResponse(
                user.getId(), user.getNickName(), user.getProfileImage(),
                user.getMessage(), user.getLevel(), user.getExperience(),
                followerCnt, followingCnt, profileBadgeList
        );

        return ResponseEntity.ok(BaseResponse.success("내 프로필 조회 성공", response));
    }

    public ResponseEntity<BaseResponse<GetUserProfileResponse>> getUserProfile(
            Long myId, Long userId
    ) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        int followerCnt = followRepository.countByFollowingId(userId);
        int followingCnt = followRepository.countByFollowerId(userId);

        boolean isFollowing = followRepository.existsByFollowerIdAndFollowingId(myId, userId);

        List<UserBadge> userBadgeList = userBadgeRepository.findByUserId(userId);
        List<ProfileBadgeDto> profileBadgeList =
                userBadgeList.stream()
                        .map(userBadge -> {
                            Badge badge = userBadge.getBadge();
                            return new ProfileBadgeDto(
                                    badge.getId(),
                                    badge.getName(),
                                    badge.getImage()
                            );
                        })
                        .collect(Collectors.toList());

        GetUserProfileResponse response = new GetUserProfileResponse(
                user.getId(), user.getNickName(), user.getProfileImage(),
                user.getMessage(), user.getLevel(), user.getExperience(),
                followerCnt, followingCnt, isFollowing, profileBadgeList
        );

        return ResponseEntity.ok(BaseResponse.success("유저 프로필 조회 성공", response));
    }

    @Transactional
    public ResponseEntity<BaseResponse<Void>> updateMyProfile(
            Long userId, UpdateMyProfileRequest request, HttpServletResponse response
    ) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        User existingUser = userRepository.findByNickName(request.getNickName());

        if (existingUser != null && !existingUser.getId().equals(userId)) {
            return ResponseEntity.ok(BaseResponse.error("닉네임 중복"));
        }

        String userKey = "refresh:" + userId;

        // 새로운 액세스 및 리프레시 토큰 생성
        String newAccess = jwtUtil.createJwt("access", request.getNickName(), 600000L); // 10분 유효
        String newRefresh = jwtUtil.createJwt("refresh", request.getNickName(), 86400000L); // 1일 유효

        // Redis에 새 리프레시 토큰 저장
        redisUtil.setex(userKey, newRefresh, 86400000L);

        // 클라이언트에 새 토큰 쿠키로 설정
        response.addCookie(createCookie("access", newAccess));
        response.addCookie(createCookie("refresh", newRefresh));

        user.updateProfile(request.getNickName(), request.getProfileImage(), request.getMessage());
        userRepository.save(user);
        return ResponseEntity.ok(BaseResponse.error("프로필 수정 완료"));
    }

    public ResponseEntity<BaseResponse<GetMyStaticResponse>> getMyStatic(Long userId) {
        Map<String, Object> stats = timeAttackRepository.calculateStats(userId);

        GetMyStaticResponse response = new GetMyStaticResponse(
                ((Double) stats.get("avgScore")).floatValue(),
                (int) stats.get("minRank")
        );

        return ResponseEntity.ok(BaseResponse.success("나의 통계 조회 성공", response));
    }


    /**
     * 쿠키를 생성합니다.
     *
     * @param key 쿠키 이름
     * @param value 쿠키 값
     * @return 생성된 Cookie 객체
     */
    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(60 * 60 * 60 * 60); // 쿠키 유효 기간 설정 (초 단위)
//        cookie.setSecure(true); // HTTPS 환경에서만 전송 (주석 처리 상태)
        cookie.setPath("/"); // 모든 경로에서 쿠키 접근 가능
        cookie.setHttpOnly(true); // JavaScript에서 접근 불가 (보안 강화)

        return cookie;
    }

}

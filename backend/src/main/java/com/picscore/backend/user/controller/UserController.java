package com.picscore.backend.user.controller;

import com.picscore.backend.common.model.response.BaseResponse;
import com.picscore.backend.user.jwt.JWTUtil;
import com.picscore.backend.user.model.request.SearchUsersRequest;
import com.picscore.backend.user.model.response.GetMyFollowersResponse;
import com.picscore.backend.user.model.response.GetMyFollowingsResponse;
import com.picscore.backend.user.model.response.GetUserFollowersResponse;
import com.picscore.backend.user.model.response.GetUserFollowingsResponse;
import com.picscore.backend.user.model.request.ToggleFollowRequest;
import com.picscore.backend.user.model.response.*;
import com.picscore.backend.user.repository.UserRepository;
import com.picscore.backend.user.service.FollowService;
import com.picscore.backend.user.service.OAuthService;
import com.picscore.backend.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

/**
 * 사용자 관련 API를 처리하는 컨트롤러
 * - 사용자 정보 조회
 * - 로그아웃 처리
 */
@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final JWTUtil jwtUtil;
    private final UserService userService;
    private final FollowService followService;
    private final OAuthService oAuthService;

    /**
     * 현재 로그인한 사용자의 정보를 반환합니다.
     * <p>
     * 이 API는 요청의 쿠키에서 액세스 토큰을 추출하여 사용자 정보를 조회합니다.
     *
     * @param request HTTP 요청 객체 (쿠키에서 토큰 추출)
     * @return ResponseEntity<BaseResponse < UserLoginResponse>>
     * - 사용자 정보를 포함하는 응답 객체
     */
    @GetMapping("/info")
    public ResponseEntity<BaseResponse<LoginInfoResponse>> LoginInfo(HttpServletRequest request) {
        return userService.LoginInfo(request);
    }

    /**
     * 사용자 로그아웃을 처리합니다.
     * <p>
     * 이 API는 클라이언트를 로그아웃 페이지로 리다이렉트하고,
     * 로그아웃 완료 메시지를 반환합니다.
     *
     * @param response HTTP 응답 객체
     * @return ResponseEntity<BaseResponse < Void>>
     * - 로그아웃 완료 메시지를 포함하는 응답 객체
     * @throws IOException 리다이렉트 중 발생할 수 있는 입출력 예외
     */
    @GetMapping("/logout")
    public ResponseEntity<BaseResponse<Void>> redirectToGoogleLogout(HttpServletResponse response) throws IOException {
        response.sendRedirect("/logout");
        BaseResponse<Void> baseResponse = BaseResponse.withMessage("로그아웃 완료");
        return ResponseEntity.ok(baseResponse);
    }

    /**
     * 현재 사용자의 팔로우 상태를 토글하는 엔드포인트
     *
     * @param toggleFollowRequest 팔로우 대상 사용자의 ID를 포함한 요청 객체
     * @param request             HTTP 요청 객체
     * @return ResponseEntity<BaseResponse < Void>> 팔로우 상태 변경 결과 메시지
     */
    @PostMapping("/following/me")
    public ResponseEntity<BaseResponse<Void>> toggleFollow(
            @RequestBody ToggleFollowRequest toggleFollowRequest,
            HttpServletRequest request) {
        // 현재 사용자의 ID를 토큰에서 추출
        Long followerId = oAuthService.findIdByNickName(request);

        // 팔로우 상태 토글 및 결과 확인
        Boolean follow = followService.toggleFollow(followerId, toggleFollowRequest.getFollowingId());

        // 결과에 따른 응답 메시지 생성
        BaseResponse<Void> baseResponse = follow ?
                BaseResponse.withMessage("팔로잉 추가 완료") :
                BaseResponse.withMessage("팔로잉 취소 완료");

        // 응답 반환
        return ResponseEntity.ok(baseResponse);
    }

    /**
     * 현재 사용자의 팔로워 목록을 조회하는 엔드포인트
     *
     * @param request HTTP 요청 객체
     * @return ResponseEntity<BaseResponse < GetMyFollowersResponse>> 팔로워 목록 정보
     */
    @GetMapping("/follower/me")
    public ResponseEntity<BaseResponse<List<GetMyFollowersResponse>>> getMyFollowers(HttpServletRequest request) {
        // 현재 사용자의 ID를 토큰에서 추출
        Long userId = oAuthService.findIdByNickName(request);

        // 팔로워 목록 조회 및 응답 반환
        return followService.getMyFollowers(userId);
    }

    /**
     * 현재 사용자의 팔로잉 목록을 조회하는 엔드포인트
     *
     * @param request HTTP 요청 객체
     * @return ResponseEntity<BaseResponse < GetMyFollowersResponse>> 팔로잉 목록 정보
     */
    @GetMapping("/following/me")
    public ResponseEntity<BaseResponse<List<GetMyFollowingsResponse>>> getMyFollowings(HttpServletRequest request) {
        // 현재 사용자의 ID를 토큰에서 추출
        Long userId = oAuthService.findIdByNickName(request);

        // 팔로잉 목록 조회 및 응답 반환
        return followService.getMyFollowings(userId);
    }

    @GetMapping("/follower/{userId}")
    public ResponseEntity<BaseResponse<List<GetUserFollowersResponse>>> getUserFollowers(
            HttpServletRequest request,
            @PathVariable Long userId) {

        Long myId = oAuthService.findIdByNickName(request);

        return followService.getUserFollowers(myId, userId);
    }

    @GetMapping("/following/{userId}")
    public ResponseEntity<BaseResponse<List<GetUserFollowingsResponse>>> getUserFollowings(
            HttpServletRequest request,
            @PathVariable Long userId
    ) {

        Long myId = oAuthService.findIdByNickName(request);

        return followService.getUserFollowings(myId, userId);
    }

    @DeleteMapping("/follower/{userId}")
    public ResponseEntity<BaseResponse<Void>> deleteMyFollower(
            HttpServletRequest request,
            @PathVariable Long userId
            ) {

        Long myId = oAuthService.findIdByNickName(request);

        return followService.deleteMyFollower(myId, userId);
    }

    @GetMapping("/search")
    public ResponseEntity<BaseResponse<List<SearchUsersResponse>>> searchUser(
            @RequestBody SearchUsersRequest request
    ) {

        return userService.searchUser(request.getSearchText());
    }

    @GetMapping("/profile/me")
    public ResponseEntity<BaseResponse<GetMyProfileResponse>> getMyProfile(
            HttpServletRequest request
    ) {

        Long userId = oAuthService.findIdByNickName(request);

        return userService.getMyProfile(userId);
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<BaseResponse<GetUserProfileResponse>> getUserProfile(
            HttpServletRequest request,
            @PathVariable Long userId
    ) {

        Long myId = oAuthService.findIdByNickName(request);

        return userService.getUserProfile(myId, userId);
    }
}

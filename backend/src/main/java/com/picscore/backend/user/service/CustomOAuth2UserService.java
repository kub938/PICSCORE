package com.picscore.backend.user.service;

import com.picscore.backend.user.model.dto.CustomOAuth2User;
import com.picscore.backend.user.model.dto.UserDto;
import com.picscore.backend.user.model.entity.User;
import com.picscore.backend.user.model.response.GoogleResponse;
import com.picscore.backend.user.model.response.OAuth2Response;
import com.picscore.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    /**
     * OAuth2 인증 후 사용자 정보를 로드합니다.
     *
     * @param userRequest OAuth2UserRequest 객체 (클라이언트 요청 정보 포함)
     * @return OAuth2User 객체 (사용자 정보 포함)
     * @throws OAuth2AuthenticationException 인증 실패 시 발생하는 예외
     */
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        // 부모 클래스의 loadUser 메서드를 호출하여 기본 사용자 정보를 가져옵니다.
        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println("oAuth2User = " + oAuth2User);

        // 클라이언트 등록 ID 확인 (예: google, facebook 등)
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2Response oAuth2Response = null;

        // Google 로그인 처리
        if (registrationId.equals("google")) {
            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
        } else {
            return null; // 지원하지 않는 OAuth 제공자일 경우 null 반환
        }

        // 소셜 ID로 기존 사용자 조회
        User existData = userRepository.findBySocialId(oAuth2Response.getProviderId());

        if (existData == null) {
            // 기존 데이터가 없을 경우 새 사용자 생성 및 저장
            User user = new User(
                    oAuth2Response.getProviderId(),
                    oAuth2Response.getProvider(),
                    oAuth2Response.getName(),
                    oAuth2Response.getProfileImage(),
                    "상태메시지를 작성해주세요!",
                    0,
                    0
            );

            userRepository.save(user);

            // 새 사용자 정보를 UserDto에 매핑
            UserDto userDto = new UserDto(
                    oAuth2Response.getName(),
                    "ROLE_USER"
            );

            return new CustomOAuth2User(userDto);
        } else {
            // 기존 데이터가 있을 경우 닉네임 업데이트 후 저장
            existData.updateNickName(oAuth2Response.getName());
            userRepository.save(existData);

            // 기존 사용자 정보를 UserDto에 매핑
            UserDto userDto = new UserDto(oAuth2Response.getName(), "ROLE_USER");

            return new CustomOAuth2User(userDto);
        }
    }
}


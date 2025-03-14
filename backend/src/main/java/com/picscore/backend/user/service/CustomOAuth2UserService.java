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
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println("oAuth2User = " + oAuth2User);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2Response oAuth2Response = null;
        if (registrationId.equals("google")) {

            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
        }
        else {

            return null;
        }

        User existData = userRepository.findBySocialId(oAuth2Response.getProviderId());

        if (existData == null) {

            User user = new User();
            user.setSocialId(oAuth2Response.getProviderId());
            user.setSocialType(oAuth2Response.getProvider());
            user.setNickName(oAuth2Response.getName());
            user.setProfileImage(oAuth2Response.getProfileImage());
            user.setMessage("상태메시지를 작성해주세요!");
            user.setLevel(0);
            user.setExperience(0);

            userRepository.save(user);

            UserDto userDto = new UserDto();
            userDto.setNickName(oAuth2Response.getName());
            userDto.setRole("ROLE_USER");

            return new CustomOAuth2User(userDto);
        }
        else {
            existData.setNickName(oAuth2Response.getName());

            userRepository.save(existData);

            UserDto userDto = new UserDto();
            userDto.setNickName(oAuth2Response.getName());
            userDto.setRole("ROLE_USER");

            return new CustomOAuth2User(userDto);
        }

    }
}

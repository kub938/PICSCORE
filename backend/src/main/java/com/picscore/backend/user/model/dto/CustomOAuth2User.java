package com.picscore.backend.user.model.dto;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@RequiredArgsConstructor
public class CustomOAuth2User implements OAuth2User {

    private final UserDto userDto;


    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection = new ArrayList<>();

        collection.add(new GrantedAuthority() {

            @Override
            public String getAuthority() {

                return userDto.getRole();
            }
        });

        return collection;
    }

    @Override
    public String getName() {
        return userDto.getNickName();
    }

    public String getSocialId() {
        return userDto.getSocialId();
    }

    public String getSocialType() {
        return userDto.getSocialType();
    }

    public String getNickName() {
        return userDto.getNickName();
    }

    public String getProfileImage() {
        return userDto.getProfileImage();
    }

    public String getMessage() {
        return userDto.getMessage();
    }

    public int getLevel() {
        return userDto.getLevel();
    }

    public int getExperience() {
        return userDto.getExperience();
    }
}

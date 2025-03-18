package com.picscore.backend.user.service;

import com.picscore.backend.user.model.entity.Follow;
import com.picscore.backend.user.model.entity.User;
import com.picscore.backend.user.repository.FollowRepository;
import com.picscore.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;


    @Transactional
    public Boolean toggleFollow(Long followerId, Long followingId) {
        User follower = userRepository.findById(followerId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + followerId));
        User following = userRepository.findById(followingId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID; " + followingId));

        Optional<Follow> existingFollow = followRepository.findByFollowerIdAndFollowingId(followerId, followingId);

        if (existingFollow.isPresent()) {
            followRepository.delete(existingFollow.get());
            return false;
        } else {
            Follow follow = new Follow(null, follower, following);
            followRepository.save(follow);
            return true;
        }
    }
}

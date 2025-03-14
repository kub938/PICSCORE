package com.picscore.backend.user.repository;

import com.picscore.backend.user.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findBySocialId(String socialId);
}

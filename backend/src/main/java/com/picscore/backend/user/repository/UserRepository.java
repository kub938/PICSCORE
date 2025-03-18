package com.picscore.backend.user.repository;

import com.picscore.backend.user.model.entity.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {

    User findBySocialId(String socialId);

    User findByNickName(String nickName);

    @Query("SELECT u.id FROM User u WHERE u.nickName = :nickName")
    Long findIdByNickName(@Param("nickName") String nickName);
}

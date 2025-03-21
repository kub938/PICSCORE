package com.picscore.backend.timeattack.repository;

import com.picscore.backend.timeattack.model.entity.TimeAttack;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface TimeAttackRepository extends JpaRepository<TimeAttack, Long> {

    List<TimeAttack> findByUserId(Long userId);

    @Query("SELECT " +
            "AVG(t.score) as avgScore, " +
            "MIN(t.ranking) as minRank " +
            "FROM TimeAttack t " +
            "WHERE t.user.id = :userId")
    Map<String, Object> calculateStats(@Param("userId") Long userId);
}

package com.picscore.backend.timeattack.repository;

import com.picscore.backend.timeattack.model.entity.TimeAttack;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @Query(value = """
                SELECT t FROM TimeAttack t
                WHERE (t.user, t.score, t.createdAt) IN (
                    SELECT t2.user, MAX(t2.score), MAX(t2.createdAt)
                    FROM TimeAttack t2
                    GROUP BY t2.user
                )
                ORDER BY t.score DESC, t.createdAt DESC
            """,
            countQuery = "SELECT COUNT(DISTINCT t.user) FROM TimeAttack t")
    Page<TimeAttack> findHighestScoresPerUser(Pageable pageable);



}

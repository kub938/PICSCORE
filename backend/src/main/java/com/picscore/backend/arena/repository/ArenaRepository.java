package com.picscore.backend.arena.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArenaRepository<Arena> extends JpaRepository<Arena, Long> {
    Optional<Arena> findByUserIdAndActivityWeek(Long userId, int activityWeek);
}

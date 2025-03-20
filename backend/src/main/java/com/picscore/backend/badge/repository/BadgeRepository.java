package com.picscore.backend.badge.repository;

import com.picscore.backend.badge.model.entity.Badge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BadgeRepository extends JpaRepository<Badge, Long> {
}

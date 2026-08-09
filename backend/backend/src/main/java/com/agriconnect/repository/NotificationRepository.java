package com.agriconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.agriconnect.entity.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    List<Notification> findByUserTypeAndUserIdOrderByCreatedAtDesc(
            String userType,
            Integer userId);

    long countByUserTypeAndUserIdAndIsReadFalse(
            String userType,
            Integer userId);
}
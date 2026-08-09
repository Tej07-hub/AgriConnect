package com.agriconnect.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.agriconnect.entity.Notification;
import com.agriconnect.repository.NotificationRepository;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    // Create Notification
    public Notification createNotification(Integer userId,
            String userType,
            String title,
            String message) {

System.out.println("createNotification() called");

Notification notification = new Notification();

notification.setUserId(userId);
notification.setUserType(userType);
notification.setTitle(title);
notification.setMessage(message);
notification.setIsRead(false);

Notification saved = notificationRepository.save(notification);

System.out.println("Notification saved with ID: " + saved.getNotificationId());

return saved;
}

    // Get Notifications
    public List<Notification> getNotifications(Integer userId,
                                               String userType) {

        return notificationRepository
                .findByUserTypeAndUserIdOrderByCreatedAtDesc(userType, userId);
    }

    // Mark One Notification as Read
    public Notification markAsRead(Integer notificationId) {

        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setIsRead(true);

        return notificationRepository.save(notification);
    }

    // Mark All Notifications as Read
    public void markAllAsRead(Integer userId,
                              String userType) {

        List<Notification> notifications =
                notificationRepository.findByUserTypeAndUserIdOrderByCreatedAtDesc(
                        userType, userId);

        for (Notification notification : notifications) {
            notification.setIsRead(true);
        }

        notificationRepository.saveAll(notifications);
    }

    // Unread Count
    public long getUnreadCount(Integer userId,
                               String userType) {

        return notificationRepository
                .countByUserTypeAndUserIdAndIsReadFalse(userType, userId);
    }
    

}
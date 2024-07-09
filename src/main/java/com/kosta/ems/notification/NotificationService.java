package com.kosta.ems.notification;

import java.util.Collection;

import org.springframework.stereotype.Service;

@Service
public interface NotificationService {


    Collection<NotificationDTO> searchAll(String managerId, int page, int size);

<<<<<<< HEAD
<<<<<<< HEAD
    Collection<NotificationDTO> searchByKeyword(String keyword, String managerId,int page,int size);
=======
    Collection<NotificationDTO> searchByKeyword(String keyword, String managerId,int page,int size) throws NoResultsFoundException;
>>>>>>> da043a0 (feat: 페이지네이션)
=======
    Collection<NotificationDTO> searchByKeyword(String keyword, String managerId,int page,int size);
>>>>>>> 5b96194 (feat: 임시 branch commit)

    boolean addNotification(NotificationDTO notification);

    boolean deleteNotificaiotn(int notificationSeq);

    boolean updateNotification(NotificationDTO notification);

    NotificationDTO getDescription(int notificationSeq);

    Integer getTotalCount(String managerId,String keyword);


}

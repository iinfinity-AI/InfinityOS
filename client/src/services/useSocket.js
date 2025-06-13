// In a useSocket.js hook
import { useEffect } from 'react';
import io from 'socket.io-client';
import { playNotificationSound } from '../services/notificationSound';

export const useSocket = (userId, onNewNotification) => {
  useEffect(() => {
    if (!userId) return;
    
    const socket = io();
    
    // Identify the user to the server
    socket.emit('login', userId);
    
    // Listen for notifications
    socket.on('notification', (notification) => {
      // Play sound
      playNotificationSound();
      
      // Update UI
      if (onNewNotification) {
        onNewNotification(notification);
      }
    });
    
    return () => {
      socket.disconnect();
    };
  }, [userId, onNewNotification]);
};
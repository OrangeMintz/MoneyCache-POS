import { updateLastActivity } from '@/utils/activityUtils';
import { useEffect } from 'react';

export default function useInactivityDetection() {
  useEffect(() => {
    // Events to track user activity
    const activityEvents = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
    ];

    const handleUserActivity = () => {
      updateLastActivity();
    };

    // Add event listeners for all activity events
    activityEvents.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });

    // Initialize the timer
    updateLastActivity();

    // Clean up event listeners
    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, []);
}

import { isInactive, setLockedState, updateLastActivity } from '@/utils/activityUtils';
import { useEffect } from 'react';

export default function useInactivityDetection(onInactive: () => void) {
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

    // Check for inactivity every second
    const checkInterval = setInterval(() => {
      if (isInactive()) {
        setLockedState(true);
        onInactive();
      }
    }, 1000); // Check every 1 second

    return () => {
      // Clean up event listeners
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
      clearInterval(checkInterval);
    };
  }, [onInactive]);
} 
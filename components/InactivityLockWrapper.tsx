'use client'
import useInactivityDetection from '@/hooks/useInactivityDetection';
import { isInactive } from '@/utils/activityUtils';
import { useEffect, useState } from 'react';
import LockoutScreen from './LockoutScreen';

interface InactivityLockWrapperProps {
  children: React.ReactNode;
}

export default function InactivityLockWrapper({ children }: InactivityLockWrapperProps) {
  const [isLocked, setIsLocked] = useState<boolean>(false);
  
  // Set up activity detection
  useInactivityDetection();
  
  useEffect(() => {
    // Check for inactivity every minute
    const checkInterval = setInterval(() => {
      if (isInactive()) {
        setIsLocked(true);
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(checkInterval);
  }, []);
  
  const handlePinSubmit = (pin: string): void => {
    setIsLocked(false);
  };
  
  // If system is locked, show the lockout screen
  if (isLocked) {
    return <LockoutScreen onPinSubmit={handlePinSubmit} />;
  }
  
  // If system is not locked, show the regular content
  return <>{children}</>;
}
'use client'
import useInactivityDetection from '@/hooks/useInactivityDetection';
import { clearLockState, getLockedState } from '@/utils/activityUtils';
import { useEffect, useState } from 'react';
import LockoutScreen from './LockoutScreen';

interface InactivityLockWrapperProps {
  children: React.ReactNode;
}

export default function InactivityLockWrapper({ children }: InactivityLockWrapperProps) {
  const [isLocked, setIsLocked] = useState<boolean>(false);
  
  // Check locked state on initial render
  useEffect(() => {
    const checkLockedState = () => {
      const locked = getLockedState();
      setIsLocked(locked);
    };
    
    // Check on mount and when storage changes
    checkLockedState();
    
    // Check every second if lock state has changed
    const intervalId = setInterval(checkLockedState, 1000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Set up activity detection
  useInactivityDetection(() => {
    setIsLocked(true);
  });
  
  const handlePinSubmit = (pin: string): void => {
    clearLockState();
    setIsLocked(false);
  };
  
  // If system is locked, show the lockout screen
  if (isLocked) {
    return <LockoutScreen onPinSubmit={handlePinSubmit} />;
  }
  
  // If system is not locked, show the regular content
  return <>{children}</>;
}
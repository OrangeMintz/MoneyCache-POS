import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { isWithinBusinessHours } from '../utils/timeUtils';
import LockoutScreen from './LockoutScreen';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isPinCorrect, setIsPinCorrect] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if system should be locked on initial load
    const checkLockStatus = () => {
      const withinHours = isWithinBusinessHours();
      setIsLocked(!withinHours && !isPinCorrect);
    };
    
    checkLockStatus();
    
    // Set up interval to check every minute
    const interval = setInterval(checkLockStatus, 60000);
    
    return () => clearInterval(interval);
  }, [isPinCorrect]);
  
  const handlePinSubmit = (pin: string): void => {
    const DEFAULT_PIN = '1234';
    if (pin === DEFAULT_PIN) {
      setIsPinCorrect(true);
      setIsLocked(false);
    }
  };
  
  // If system is locked, show the lockout screen
  if (isLocked) {
    return <LockoutScreen onPinSubmit={handlePinSubmit} />;
  }
  
  // If system is not locked or PIN is correct, show the regular content
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
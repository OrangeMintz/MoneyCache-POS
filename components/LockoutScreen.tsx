import { updateLastActivity } from '@/utils/activityUtils';
import Image from 'next/image';
import { useState } from 'react';

interface LockoutScreenProps {
  onPinSubmit: (pin: string) => void;
}

export default function LockoutScreen({ onPinSubmit }: LockoutScreenProps) {
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<string>('');
  const DEFAULT_PIN = '1234';
  
  const handleUnlock = (): void => {
    if (pin === DEFAULT_PIN) {
      // Reset the activity timer when unlocking
      updateLastActivity();
      onPinSubmit(pin);
    } else {
      setError('Incorrect PIN. Please try again.');
      setPin('');
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">System Locked</h1>
        
        <div className="mb-6">
          <Image
            src="/images/imeds.gif" // Place your image in the public folder
            alt="System Locked"
            width={400}
            height={300}
            className="rounded-md"
          />
        </div>
        
        <p className="mb-4 text-center text-gray-700">
          The system has been locked due to inactivity.
          Enter PIN to access the system.
        </p>
        
        <div className="mb-4">
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter PIN"
            className="w-full p-2 border border-gray-300 rounded"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleUnlock();
              }
            }}
          />
        </div>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <button
          onClick={handleUnlock}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          Unlock System
        </button>
      </div>
    </div>
  );
}

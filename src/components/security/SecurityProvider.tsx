
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSecurityHeaders } from '@/hooks/useSecurityHeaders';
import { rateLimiter } from '@/utils/security';

interface SecurityContextType {
  isRateLimited: (action: string) => boolean;
  resetRateLimit: (action: string) => void;
}

const SecurityContext = createContext<SecurityContextType>({
  isRateLimited: () => false,
  resetRateLimit: () => {},
});

export const useSecurityContext = () => useContext(SecurityContext);

export const SecurityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Apply security headers
  useSecurityHeaders();
  
  // Create a unique identifier for the user session
  const [sessionId] = useState<string>(() => 
    `session_${Math.random().toString(36).substring(2, 15)}`
  );

  // Check if an action is rate limited
  const isRateLimited = (action: string): boolean => {
    return rateLimiter.isLimited(`${sessionId}_${action}`);
  };

  // Reset rate limiting for an action
  const resetRateLimit = (action: string): void => {
    rateLimiter.reset(`${sessionId}_${action}`);
  };

  // Value to provide to consumers
  const contextValue: SecurityContextType = {
    isRateLimited,
    resetRateLimit,
  };

  return (
    <SecurityContext.Provider value={contextValue}>
      {children}
    </SecurityContext.Provider>
  );
};

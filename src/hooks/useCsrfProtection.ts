
import { useState, useEffect } from 'react';
import { generateCSRFToken } from '@/utils/security';

/**
 * Hook to provide CSRF protection for forms
 * @returns CSRF token and functions to validate it
 */
export const useCsrfProtection = () => {
  const [csrfToken, setCsrfToken] = useState<string>('');

  useEffect(() => {
    // Generate a new CSRF token when the component mounts
    const newToken = generateCSRFToken();
    setCsrfToken(newToken);
    
    // Store the token in sessionStorage for validation
    sessionStorage.setItem('csrfToken', newToken);
  }, []);

  /**
   * Validates a token against the stored token
   * @param token Token to validate
   * @returns Boolean indicating if token is valid
   */
  const validateToken = (token: string): boolean => {
    const storedToken = sessionStorage.getItem('csrfToken');
    return token === storedToken;
  };

  /**
   * Refreshes the CSRF token
   */
  const refreshToken = (): string => {
    const newToken = generateCSRFToken();
    setCsrfToken(newToken);
    sessionStorage.setItem('csrfToken', newToken);
    return newToken;
  };

  return { csrfToken, validateToken, refreshToken };
};

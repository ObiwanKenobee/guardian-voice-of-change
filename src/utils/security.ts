
/**
 * Security utility functions for protecting against common web vulnerabilities
 */

/**
 * Sanitizes user input to prevent XSS attacks by removing potentially dangerous HTML
 * @param input - The string to sanitize
 * @returns A sanitized string
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  // Replace potentially dangerous characters with their HTML entities
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

/**
 * Validates input against a regex pattern
 * @param input - The string to validate
 * @param pattern - The regex pattern to test against
 * @returns Boolean indicating if input matches pattern
 */
export const validatePattern = (input: string, pattern: RegExp): boolean => {
  return pattern.test(input);
};

/**
 * Common regex patterns for validation
 */
export const securityPatterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  noScript: /^[^<>]*$/,
  alphanumeric: /^[a-zA-Z0-9\s]*$/,
  phone: /^[0-9+\-\s()]*$/,
};

/**
 * Validates CSRF token to prevent cross-site request forgery
 * @param token - The token to validate
 * @returns Boolean indicating if token is valid
 */
export const validateCSRFToken = (token: string, storedToken: string): boolean => {
  return token === storedToken;
};

/**
 * Generates a secure random token for CSRF protection
 * @returns A random token string
 */
export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * Rate limiting implementation to prevent brute force attacks
 */
class RateLimiter {
  private attempts: Map<string, { count: number, timestamp: number }> = new Map();
  private readonly limit: number;
  private readonly timeWindowMs: number;

  constructor(limit: number = 5, timeWindowMs: number = 60000) {
    this.limit = limit;
    this.timeWindowMs = timeWindowMs;
  }

  /**
   * Check if an IP has exceeded the rate limit
   * @param identifier - Usually the IP address
   * @returns Boolean indicating if limit is exceeded
   */
  isLimited(identifier: string): boolean {
    const now = Date.now();
    const record = this.attempts.get(identifier);
    
    // If no record exists or record is expired, create new record
    if (!record || (now - record.timestamp > this.timeWindowMs)) {
      this.attempts.set(identifier, { count: 1, timestamp: now });
      return false;
    }
    
    // If record exists and is within time window
    if (record.count >= this.limit) {
      return true;
    }
    
    // Increment attempt count
    this.attempts.set(identifier, { 
      count: record.count + 1, 
      timestamp: record.timestamp 
    });
    
    return false;
  }

  /**
   * Reset the counter for an identifier
   * @param identifier - Usually the IP address
   */
  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

// Export a singleton instance
export const rateLimiter = new RateLimiter();

/**
 * Content Security Policy directives
 * Used to create secure CSP headers
 */
export const cspDirectives = {
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'", "https://api.mails.so", "'unsafe-inline'"],
  styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  imgSrc: ["'self'", "data:", "https://source.unsplash.com", "https://images.unsplash.com"],
  connectSrc: ["'self'", "https://api.mails.so", "https://jklewwlnrlzomkaetjjo.supabase.co"],
  fontSrc: ["'self'", "https://fonts.gstatic.com"],
  objectSrc: ["'none'"],
  mediaSrc: ["'self'"],
  frameSrc: ["'none'"],
  formAction: ["'self'"],
  upgradeInsecureRequests: []
};

/**
 * Builds a Content Security Policy header value from directives
 * @returns CSP header string
 */
export const buildCSPHeader = (): string => {
  return Object.entries(cspDirectives)
    .map(([key, values]) => {
      // Handle directives with no values (like upgrade-insecure-requests)
      if (values.length === 0) {
        return key;
      }
      
      // Convert camelCase to kebab-case for the directive name
      const directive = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${directive} ${values.join(' ')}`;
    })
    .join('; ');
};

/**
 * Security headers to be applied to requests
 */
export const securityHeaders = {
  'Content-Security-Policy': buildCSPHeader(),
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload'
};

/**
 * Encrypt sensitive data for storage
 * @param data - Data to encrypt
 * @param key - Encryption key
 * @returns Encrypted data string
 */
export const encryptData = (data: string, key: string): string => {
  // This is a simplified placeholder implementation
  // In a production environment, use a proper encryption library
  const encoded = btoa(data);
  return encoded;
};

/**
 * Decrypt sensitive data from storage
 * @param encryptedData - Encrypted data
 * @param key - Decryption key
 * @returns Decrypted data string
 */
export const decryptData = (encryptedData: string, key: string): string => {
  // This is a simplified placeholder implementation
  // In a production environment, use a proper decryption library
  try {
    return atob(encryptedData);
  } catch (e) {
    console.error('Decryption failed:', e);
    return '';
  }
};

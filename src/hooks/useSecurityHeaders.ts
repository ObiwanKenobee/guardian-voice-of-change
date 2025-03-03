
import { useEffect } from 'react';
import { securityHeaders } from '@/utils/security';

/**
 * Hook to apply security headers to the document
 * This is a client-side implementation and should be complemented with server-side headers
 */
export const useSecurityHeaders = () => {
  useEffect(() => {
    // Apply Content Security Policy as a meta tag (for browsers that support it)
    const cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = 'Content-Security-Policy';
    cspMeta.content = securityHeaders['Content-Security-Policy'];
    document.head.appendChild(cspMeta);

    // Apply other security headers that can be set via meta tags
    const xssProtectionMeta = document.createElement('meta');
    xssProtectionMeta.httpEquiv = 'X-XSS-Protection';
    xssProtectionMeta.content = securityHeaders['X-XSS-Protection'];
    document.head.appendChild(xssProtectionMeta);

    const contentTypeMeta = document.createElement('meta');
    contentTypeMeta.httpEquiv = 'X-Content-Type-Options';
    contentTypeMeta.content = securityHeaders['X-Content-Type-Options'];
    document.head.appendChild(contentTypeMeta);

    const frameMeta = document.createElement('meta');
    frameMeta.httpEquiv = 'X-Frame-Options';
    frameMeta.content = securityHeaders['X-Frame-Options'];
    document.head.appendChild(frameMeta);

    const referrerMeta = document.createElement('meta');
    referrerMeta.name = 'referrer';
    referrerMeta.content = securityHeaders['Referrer-Policy'];
    document.head.appendChild(referrerMeta);

    // Clean up function to remove meta tags when component unmounts
    return () => {
      document.head.removeChild(cspMeta);
      document.head.removeChild(xssProtectionMeta);
      document.head.removeChild(contentTypeMeta);
      document.head.removeChild(frameMeta);
      document.head.removeChild(referrerMeta);
    };
  }, []);
};

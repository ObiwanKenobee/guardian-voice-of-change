
/**
 * Determines the appropriate dashboard path based on the user's role and industry.
 * This helps in providing a personalized experience after sign-up.
 */
export const getRoleDashboardPath = (role: string, industry: string): string => {
  if (!role || !industry) {
    return '/workspace/dashboard';
  }
  
  // You can expand this logic to provide different dashboards based on role and industry
  if (role === 'admin') {
    return '/workspace/admin-dashboard';
  }
  
  if (industry === 'wildlife-conservation' || industry === 'conservation') {
    return '/workspace/wildlife';
  }
  
  if (industry === 'supply-chain') {
    return '/workspace/supply-chain';
  }
  
  // Default dashboard
  return '/workspace/dashboard';
};

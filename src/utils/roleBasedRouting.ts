
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

/**
 * Returns a personalized description based on the user's role and industry.
 * This provides contextual information in the dashboard.
 */
export const getRoleDescription = (role: string, industry: string): string => {
  if (!role || !industry) {
    return 'Welcome to your personalized dashboard.';
  }
  
  if (role === 'admin') {
    return 'As an administrator, you have access to all system features and configurations.';
  }
  
  if (role === 'analyst') {
    return 'As an analyst, you have advanced data visualization and reporting tools at your disposal.';
  }
  
  if (role === 'manager') {
    return 'As a manager, you can oversee team activities and approve workflows.';
  }
  
  if (industry === 'wildlife-conservation' || industry === 'conservation') {
    return `Your ${role} dashboard is optimized for wildlife conservation projects and monitoring.`;
  }
  
  if (industry === 'supply-chain') {
    return `Your ${role} dashboard provides supply chain transparency and ethical sourcing tools.`;
  }
  
  return `Welcome to your personalized ${industry} dashboard as a ${role}.`;
};

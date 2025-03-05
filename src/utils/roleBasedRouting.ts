
// Define the role dashboard mapping types
type IndustryType = 'manufacturing' | 'retail' | 'technology' | 
                   'agriculture' | 'transportation' | 'energy' | 'healthcare' | 'other';

type RoleType = 'Supply Chain Manager' | 'ESG Officer' | 'CSR Leader' | 
               'Sustainability Director' | 'Operations Manager' | 'Other';

// Role + Industry specific dashboard paths
const roleDashboardMap: Record<RoleType, Record<IndustryType, string>> = {
  'Supply Chain Manager': {
    'manufacturing': '/workspace/supply-chain-map',
    'retail': '/workspace/ethical-sourcing',
    'technology': '/workspace/supply-chain-map',
    'agriculture': '/workspace/supply-chain-map',
    'transportation': '/workspace/supply-chain-map',
    'energy': '/workspace/supply-chain-map',
    'healthcare': '/workspace/supply-chain-map',
    'other': '/workspace/supply-chain-map',
  },
  'ESG Officer': {
    'manufacturing': '/workspace/esg-integration',
    'retail': '/workspace/carbon-footprint',
    'technology': '/workspace/esg-integration',
    'agriculture': '/workspace/esg-integration',
    'transportation': '/workspace/carbon-footprint',
    'energy': '/workspace/esg-integration',
    'healthcare': '/workspace/esg-integration',
    'other': '/workspace/esg-integration',
  },
  'CSR Leader': {
    'manufacturing': '/workspace/esg-reporting',
    'retail': '/workspace/ethical-sourcing',
    'technology': '/workspace/ethical-sourcing',
    'agriculture': '/workspace/esg-reporting',
    'transportation': '/workspace/esg-reporting',
    'energy': '/workspace/esg-reporting',
    'healthcare': '/workspace/esg-reporting',
    'other': '/workspace/esg-reporting',
  },
  'Sustainability Director': {
    'manufacturing': '/workspace/carbon-footprint',
    'retail': '/workspace/carbon-footprint',
    'technology': '/workspace/carbon-footprint',
    'agriculture': '/workspace/carbon-footprint',
    'transportation': '/workspace/carbon-footprint',
    'energy': '/workspace/carbon-footprint',
    'healthcare': '/workspace/carbon-footprint',
    'other': '/workspace/carbon-footprint',
  },
  'Operations Manager': {
    'manufacturing': '/workspace/risk-monitoring',
    'retail': '/workspace/risk-monitoring',
    'technology': '/workspace/performance-analytics',
    'agriculture': '/workspace/risk-monitoring',
    'transportation': '/workspace/risk-monitoring',
    'energy': '/workspace/risk-monitoring',
    'healthcare': '/workspace/risk-monitoring',
    'other': '/workspace/risk-monitoring',
  },
  'Other': {
    'manufacturing': '/workspace/dashboard',
    'retail': '/workspace/dashboard',
    'technology': '/workspace/dashboard',
    'agriculture': '/workspace/dashboard',
    'transportation': '/workspace/dashboard',
    'energy': '/workspace/dashboard',
    'healthcare': '/workspace/dashboard',
    'other': '/workspace/dashboard',
  },
};

/**
 * Returns the appropriate dashboard path based on the user's role and industry
 */
export const getRoleDashboardPath = (role: string | null, industry: string | null): string => {
  if (!role || !industry) {
    return '/workspace/dashboard';
  }

  // Transform to valid keys
  const roleKey = (role as RoleType) || 'Other';
  const industryKey = (industry.toLowerCase() as IndustryType) || 'other';

  // Return the mapped dashboard or default
  if (roleDashboardMap[roleKey] && roleDashboardMap[roleKey][industryKey]) {
    return roleDashboardMap[roleKey][industryKey];
  }
  
  return '/workspace/dashboard';
};

/**
 * Returns the dashboard title based on role and industry
 */
export const getRoleDashboardTitle = (role: string | null, industry: string | null): string => {
  if (!role || !industry) {
    return 'Dashboard';
  }
  
  return `${industry} | ${role} Dashboard`;
};

/**
 * Returns feature description based on role and industry
 */
export const getRoleDescription = (role: string | null, industry: string | null): string => {
  if (!role || !industry) {
    return 'Your personalized dashboard is ready.';
  }

  const descriptions: Record<RoleType, Record<IndustryType, string>> = {
    'Supply Chain Manager': {
      'manufacturing': 'Focus on supplier performance, logistics tracking, and compliance reports.',
      'retail': 'Access ethical sourcing, inventory sustainability, and supplier ESG ratings.',
      'technology': 'Track component lifecycle and sustainable sourcing initiatives.',
      'agriculture': 'Monitor crop supply chains and distribution efficiency.',
      'transportation': 'Analyze fleet emissions and logistics sustainability.',
      'energy': 'Optimize energy supply logistics and resource allocation.',
      'healthcare': 'Manage medical supply chains and procurement compliance.',
      'other': 'Access your supply chain management dashboard.',
    },
    'ESG Officer': {
      'manufacturing': 'Track emissions, waste management, and regulatory compliance.',
      'retail': 'Monitor carbon footprint and ethical labor practices.',
      'technology': 'Analyze data center sustainability and responsible AI policies.',
      'agriculture': 'Monitor sustainable farming practices and carbon capture.',
      'transportation': 'Analyze transportation emissions and green fuel usage.',
      'energy': 'Manage renewable energy mix and carbon offsets.',
      'healthcare': 'Track hospital emissions and waste reduction initiatives.',
      'other': 'Access your ESG management dashboard.',
    },
    // Add similar entries for other roles...
    'CSR Leader': {
      'manufacturing': 'Access social impact reports and community engagement initiatives.',
      'retail': 'Monitor fair trade compliance and labor rights tracking.',
      'technology': 'Manage employee sustainability programs and tech recycling initiatives.',
      'agriculture': 'Develop sustainable farming partnerships.',
      'transportation': 'Track public transport accessibility and corporate responsibility programs.',
      'energy': 'Monitor renewable investments and community impact initiatives.',
      'healthcare': 'Manage healthcare access programs and ethical sourcing of medical products.',
      'other': 'Access your CSR management dashboard.',
    },
    'Sustainability Director': {
      'manufacturing': 'Develop end-to-end sustainability strategy and circular economy initiatives.',
      'retail': 'Manage green packaging and lifecycle sustainability.',
      'technology': 'Track cloud carbon impact and product lifecycle sustainability.',
      'agriculture': 'Monitor land conservation and biodiversity metrics.',
      'transportation': 'Develop smart logistics and eco-friendly transit solutions.',
      'energy': 'Manage carbon credit programs and net-zero strategies.',
      'healthcare': 'Implement sustainable medical practices and green hospital initiatives.',
      'other': 'Access your sustainability management dashboard.',
    },
    'Operations Manager': {
      'manufacturing': 'Monitor production efficiency, waste reduction, and ESG-aligned workflows.',
      'retail': 'Manage store operations and sustainable warehousing.',
      'technology': 'Optimize green IT infrastructure and efficiency initiatives.',
      'agriculture': 'Track farm operations and sustainability metrics.',
      'transportation': 'Implement route optimization and sustainable fleet management.',
      'energy': 'Monitor power grid efficiency and operational sustainability.',
      'healthcare': 'Optimize hospital efficiency and medical waste management.',
      'other': 'Access your operations management dashboard.',
    },
    'Other': {
      'manufacturing': 'Welcome to your personalized dashboard.',
      'retail': 'Welcome to your personalized dashboard.',
      'technology': 'Welcome to your personalized dashboard.',
      'agriculture': 'Welcome to your personalized dashboard.',
      'transportation': 'Welcome to your personalized dashboard.',
      'energy': 'Welcome to your personalized dashboard.',
      'healthcare': 'Welcome to your personalized dashboard.',
      'other': 'Welcome to your personalized dashboard.',
    },
  };

  // Transform to valid keys
  const roleKey = (role as RoleType) || 'Other';
  const industryKey = (industry.toLowerCase() as IndustryType) || 'other';

  // Return the description or default
  if (descriptions[roleKey] && descriptions[roleKey][industryKey]) {
    return descriptions[roleKey][industryKey];
  }
  
  return 'Your personalized dashboard is ready.';
};

export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  organization: string;
  industry: string;
  role: string;
}

export type FormErrors = {
  [K in keyof SignUpFormData]?: string;
} & {
  general?: string;
};

/**
 * Security-related types
 */
export interface SecurityConfig {
  csrfProtection: boolean;
  rateLimiting: boolean;
  contentSecurityPolicy: boolean;
  encryptionEnabled: boolean;
}

export interface SecurityVulnerability {
  id: string;
  type: 'XSS' | 'CSRF' | 'SQLInjection' | 'BruteForce' | 'Other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  status: 'identified' | 'investigating' | 'mitigated' | 'resolved';
  detectedAt: Date;
  remediation?: string;
}

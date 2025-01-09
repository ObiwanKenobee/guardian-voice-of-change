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
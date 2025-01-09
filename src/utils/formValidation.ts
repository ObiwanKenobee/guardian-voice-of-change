import { SignUpFormData, FormErrors } from "@/types/auth";

export const validateSignUpForm = (data: SignUpFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.email) errors.email = "Email is required";
  if (!data.password) errors.password = "Password is required";
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  if (!data.fullName) errors.fullName = "Full name is required";
  if (!data.organization) errors.organization = "Organization is required";
  if (!data.role) errors.role = "Role is required";
  if (!data.industry) errors.industry = "Industry is required";

  return errors;
};
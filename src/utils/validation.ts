import { SignUpFormData, FormErrors } from "@/types/auth";

export const validateSignUpForm = (data: SignUpFormData): FormErrors => {
  const errors: FormErrors = {};

  // Email validation
  if (!data.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
    errors.email = "Invalid email address";
  }

  // Password validation
  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  // Confirm password validation
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  // Other required fields
  if (!data.fullName) errors.fullName = "Full name is required";
  if (!data.organization) errors.organization = "Organization is required";
  if (!data.role) errors.role = "Role is required";
  if (!data.industry) errors.industry = "Industry is required";

  return errors;
};

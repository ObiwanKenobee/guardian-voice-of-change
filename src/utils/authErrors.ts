import { AuthError, AuthApiError } from "@supabase/supabase-js";

export const getAuthErrorMessage = (error: AuthError) => {
  if (error instanceof AuthApiError) {
    switch (error.message) {
      case "Invalid login credentials":
        return "Invalid email or password. Please check your credentials and try again.";
      case "Email not confirmed":
        return "Please verify your email address before signing in.";
      case "User already registered":
        return "This email is already registered. Please sign in instead.";
      case "Password should be at least 6 characters":
        return "Password must be at least 6 characters long.";
      case "Invalid email":
        return "Please enter a valid email address.";
      case "Email rate limit exceeded":
        return "Too many attempts. Please try again later.";
      case "Auth rate limit exceeded":
        return "Too many login attempts. Please try again later.";
      case "User not found":
        return "No account found with this email address.";
      case "Email link is invalid or has expired":
        return "The email verification link is invalid or has expired.";
      default:
        // Log unexpected errors for debugging
        console.error("Unexpected auth error:", error);
        return error.message || "An unexpected error occurred. Please try again.";
    }
  }
  return "An unexpected error occurred. Please try again.";
};

export const validateSignUpForm = (data: {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  organization: string;
  industry: string;
  role: string;
}) => {
  const errors: Record<string, string> = {};

  // Email validation
  if (!data.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
    errors.email = "Invalid email address";
  }

  // Password validation
  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  // Confirm password validation
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  // Required fields validation
  if (!data.fullName) errors.fullName = "Full name is required";
  if (!data.organization) errors.organization = "Organization is required";
  if (!data.industry) errors.industry = "Industry is required";
  if (!data.role) errors.role = "Role is required";

  return errors;
};
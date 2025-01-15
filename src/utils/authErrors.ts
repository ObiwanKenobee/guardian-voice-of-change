import { AuthError, AuthApiError } from "@supabase/supabase-js";

export const getAuthErrorMessage = (error: AuthError) => {
  if (error instanceof AuthApiError) {
    switch (error.message) {
      case "Email not confirmed":
        return "Please check your email and confirm your account before signing in.";
      case "Invalid login credentials":
        return "Invalid email or password. Please check your credentials and try again.";
      case "Invalid email":
        return "Please enter a valid email address.";
      case "Email rate limit exceeded":
        return "Too many attempts. Please try again later.";
      default:
        return error.message;
    }
  }
  return "An unexpected error occurred. Please try again.";
};
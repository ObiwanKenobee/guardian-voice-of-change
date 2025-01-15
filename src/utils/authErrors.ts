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
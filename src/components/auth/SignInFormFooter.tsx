import { Link } from "react-router-dom";

export const SignInFormFooter = () => {
  return (
    <div className="mt-4 text-center text-sm">
      Don't have an account?{" "}
      <Link
        to="/sign-up"
        className="text-primary hover:underline"
      >
        Sign up
      </Link>
    </div>
  );
};
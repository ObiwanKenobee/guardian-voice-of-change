import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export const HeaderBranding = () => {
  return (
    <Link
      to="/workspace"
      className="flex items-center gap-2 font-semibold hover:opacity-80 transition-opacity"
    >
      <Shield className="h-6 w-6 text-primary" />
      <span className="gradient-text text-lg hidden sm:inline-block">
        Guardian-IO
      </span>
    </Link>
  );
};
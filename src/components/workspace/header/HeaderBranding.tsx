import { Shield } from "lucide-react";

export const HeaderBranding = () => {
  return (
    <div className="flex items-center gap-2">
      <Shield className="h-6 w-6 text-primary" />
      <h2 className="text-lg font-semibold text-primary hidden sm:block">
        Guardian-IO Sentinel
      </h2>
    </div>
  );
};
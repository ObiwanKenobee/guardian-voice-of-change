import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const PerformanceAlert = () => {
  return (
    <Alert>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Performance Update</AlertTitle>
      <AlertDescription>
        Your wildlife monitoring efforts reduced poaching incidents by 12% this quarter.
      </AlertDescription>
    </Alert>
  );
};
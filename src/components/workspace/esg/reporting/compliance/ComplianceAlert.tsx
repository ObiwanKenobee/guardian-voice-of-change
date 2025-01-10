import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

interface ComplianceAlertProps {
  framework: string;
  requirement: string;
  status: string;
  nextCheckAt?: string;
}

export const ComplianceAlert = ({ framework, requirement, status, nextCheckAt }: ComplianceAlertProps) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="space-y-1">
        <div className="font-medium">{framework}</div>
        <div className="text-sm text-muted-foreground">
          {requirement}
        </div>
        {nextCheckAt && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Due: {new Date(nextCheckAt).toLocaleDateString()}
          </div>
        )}
      </div>
      <Badge variant={status === 'compliant' ? 'default' : 'destructive'}>
        {status}
      </Badge>
    </div>
  );
};
import { Download, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AnalyticsHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Performance Overview</h2>
        <p className="text-muted-foreground">
          Monitor key performance indicators and optimize for impact
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Customize
        </Button>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
};
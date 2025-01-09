import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const WorkspaceHeader = () => {
  return (
    <header className="border-b bg-card">
      <div className="flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 gap-3 sm:gap-4">
        <div className="flex items-center w-full sm:w-auto sm:flex-1">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8 w-full"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-end">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
              3
            </span>
          </Button>
          <Button variant="outline" className="whitespace-nowrap w-full sm:w-auto">
            View Alerts
          </Button>
        </div>
      </div>
    </header>
  );
};
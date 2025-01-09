import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const WorkspaceHeader = () => {
  return (
    <header className="border-b bg-card">
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:px-6 sm:py-4 gap-4 sm:gap-0">
        <div className="flex items-center w-full sm:w-auto sm:flex-1">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8 w-full"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
              3
            </span>
          </Button>
          <Button variant="outline" className="whitespace-nowrap">View Alerts</Button>
        </div>
      </div>
    </header>
  );
};
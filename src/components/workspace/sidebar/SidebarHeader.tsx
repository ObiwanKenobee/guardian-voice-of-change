import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export const SidebarHeader = () => {
  const { toggleSidebar } = useSidebar();
  
  return (
    <div className="flex justify-between items-center p-4 border-b">
      <h2 className="text-lg font-semibold">Enterprise Solutions</h2>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 hover:bg-muted"
        onClick={toggleSidebar}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close Sidebar</span>
      </Button>
    </div>
  );
};
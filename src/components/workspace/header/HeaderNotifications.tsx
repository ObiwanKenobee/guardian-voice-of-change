import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

export const HeaderNotifications = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
            5
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[300px]">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          <div className="space-y-2 p-2">
            <div className="flex items-start gap-2 p-2 hover:bg-accent rounded-md">
              <Badge variant="destructive" className="mt-0.5">Alert</Badge>
              <div className="space-y-1">
                <p className="text-sm">Poaching activity detected in Serengeti Hotspot</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
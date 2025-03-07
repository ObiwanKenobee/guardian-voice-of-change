
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { NavigationMenu } from "./sidebar/NavigationMenu";
import { ChevronRight } from "lucide-react";

export function WorkspaceSidebar() {
  return (
    <>
      <SidebarTrigger>
        <div className="fixed left-4 top-20 z-50 h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 md:left-6 lg:hidden flex items-center justify-center">
          <ChevronRight className="h-5 w-5" />
        </div>
      </SidebarTrigger>
      <Sidebar 
        variant="fixed" 
        className="border-r bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 transition-all duration-300 w-[280px]"
        side="left"
        defaultCollapsed={false}
      >
        <SidebarContent>
          <SidebarHeader />
          <NavigationMenu />
        </SidebarContent>
      </Sidebar>
    </>
  );
}

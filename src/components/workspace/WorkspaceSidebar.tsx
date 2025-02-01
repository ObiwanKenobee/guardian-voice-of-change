import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { NavigationMenu } from "./sidebar/NavigationMenu";
import { ChevronLeft } from "lucide-react";

export function WorkspaceSidebar() {
  return (
    <>
      <SidebarTrigger asChild>
        <button className="fixed right-4 top-20 z-50 h-6 w-6 rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 md:right-6 lg:hidden">
          <ChevronLeft className="h-4 w-4 mx-auto" />
        </button>
      </SidebarTrigger>
      <Sidebar 
        variant="floating" 
        className="border-l bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75 transition-all duration-300"
        side="right"
        collapsible="offcanvas"
      >
        <SidebarContent>
          <SidebarHeader />
          <NavigationMenu />
        </SidebarContent>
      </Sidebar>
    </>
  );
}
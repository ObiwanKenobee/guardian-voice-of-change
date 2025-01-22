import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { NavigationMenu } from "./sidebar/NavigationMenu";

export function WorkspaceSidebar() {
  return (
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
  );
}
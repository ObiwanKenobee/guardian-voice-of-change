import { navigationItems } from "./navigationItems";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function WorkspaceSidebar() {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar variant="floating" className="border-l bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <SidebarContent>
        <div className="flex justify-end p-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={toggleSidebar}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close Sidebar</span>
          </Button>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `flex items-center gap-2 w-full ${
                          isActive ? "text-primary font-medium" : "text-muted-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
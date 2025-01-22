import { navigationItems, navigationGroups } from "./navigationItems";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  badge?: string | number;
}

const NavigationItem = ({ href, icon: Icon, label, badge }: NavigationItemProps) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <NavLink
          to={href}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 w-full px-2 py-2 rounded-md transition-colors",
              isActive
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted"
            )
          }
        >
          <Icon className="h-4 w-4 shrink-0" />
          <span className="truncate">{label}</span>
          {badge && (
            <span className="ml-auto bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

const SidebarHeader = () => {
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

const NavigationMenu = () => {
  return (
    <>
      {navigationGroups.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems
                .filter((item) => group.items.includes(item.label))
                .map((item) => (
                  <NavigationItem
                    key={item.href}
                    href={item.href}
                    icon={item.icon}
                    label={item.label}
                    badge={item.badge}
                  />
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
};

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
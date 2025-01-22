import { NavLink } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export interface NavigationItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  badge?: string;
}

export const NavigationItem = ({ href, icon: Icon, label, badge }: NavigationItemProps) => {
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
            <Badge variant="outline" className="ml-auto">
              {badge}
            </Badge>
          )}
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
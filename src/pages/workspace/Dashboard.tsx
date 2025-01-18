import { AIAgents } from "@/components/workspace/dashboard/AIAgents";
import { GlobalOverview } from "@/components/workspace/dashboard/GlobalOverview";
import { QuickActions } from "@/components/workspace/dashboard/QuickActions";
import { WelcomeHeader } from "@/components/workspace/dashboard/WelcomeHeader";
import { navigationItems } from "@/components/workspace/navigationItems";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 animate-fade-in">
      <WelcomeHeader />
      
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6">
        {/* Navigation Menu - Takes 1 column */}
        <div className="xl:col-span-1 bg-card rounded-lg border p-4">
          <h3 className="font-semibold mb-4">Navigation</h3>
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-2 w-full p-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  }`
                }
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className="text-sm">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Main Content Area - Takes 2 columns */}
        <div className="xl:col-span-2">
          <GlobalOverview />
        </div>

        {/* Quick Actions - Takes 1 column */}
        <div className="xl:col-span-1">
          <QuickActions />
        </div>
      </div>

      <AIAgents />
    </div>
  );
};

export default Dashboard;
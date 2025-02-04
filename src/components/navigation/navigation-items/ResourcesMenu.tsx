import { BookOpen, Globe, BarChart3 } from "lucide-react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

interface ResourceItemProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  badge?: string;
}

const ResourceItem = ({ title, icon, description, badge }: ResourceItemProps) => {
  const content = (
    <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
      <div className="flex items-center gap-2">
        <span className="text-primary">{icon}</span>
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium leading-none">
            {title}
          </div>
          {badge && (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {badge}
            </span>
          )}
        </div>
      </div>
      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
        {description}
      </p>
    </a>
  );

  return (
    <li className="hover:scale-[1.02] transition-transform">
      <NavigationMenuLink asChild>
        <Link to="/resources">{content}</Link>
      </NavigationMenuLink>
    </li>
  );
};

export function ResourcesMenu() {
  return (
    <ul className="grid gap-3 p-6 md:w-[400px]">
      <ResourceItem
        title="Resource Library"
        icon={<BookOpen className="h-5 w-5" />}
        description="Comprehensive guides, reports, and best practices"
        badge="Updated"
      />
      <ResourceItem
        title="Global Impact"
        icon={<Globe className="h-5 w-5" />}
        description="Real-world case studies and success stories"
      />
      <ResourceItem
        title="Analytics Hub"
        icon={<BarChart3 className="h-5 w-5" />}
        description="Advanced metrics and performance insights"
        badge="Pro"
      />
    </ul>
  );
}
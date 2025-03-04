
import { Brain, Shield, Globe, BarChart3, Zap, BookOpen } from "lucide-react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { platformFeatures } from "../navigationData";

interface ListItemProps {
  className?: string;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  badge?: string;
  emoji?: string;
}

const ListItem = ({ className, title, children, icon, href, badge }: ListItemProps) => {
  const content = (
    <a
      className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
    >
      <div className="flex items-center gap-2">
        {icon && <span className="text-primary">{icon}</span>}
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
        {children}
      </p>
    </a>
  );

  return (
    <li className="hover:scale-[1.02] transition-transform">
      <NavigationMenuLink asChild>
        {href ? <Link to={href}>{content}</Link> : content}
      </NavigationMenuLink>
    </li>
  );
};

export function PlatformFeatures() {
  return (
    <ul className="grid gap-3 p-4 md:w-[300px]">
      {platformFeatures.map((feature) => (
        <ListItem
          key={feature.title}
          title={feature.title}
          icon={feature.icon}
          href="/platform-features"
          badge={feature.title === "Supply Chain Transparency" ? "New" : undefined}
        >
          {feature.description}
        </ListItem>
      ))}
      <ListItem
        title="TURBO-X AI"
        icon={<Zap className="h-5 w-5" />}
        href="/platform-features"
        badge="Premium"
      >
        Advanced AI-powered risk detection and mitigation system
      </ListItem>
    </ul>
  );
}


import { Cat, Shield, Globe, Brain, Link2, Mountain, Car, Leaf } from "lucide-react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

interface ListItemProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  badge?: string;
  route?: string;
  external?: boolean;
}

const InnovationItem = ({ title, icon, description, badge, route, external }: ListItemProps) => {
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

  if (external) {
    return (
      <li className="hover:scale-[1.02] transition-transform">
        <NavigationMenuLink asChild>
          <a href={route} target="_blank" rel="noopener noreferrer">{content}</a>
        </NavigationMenuLink>
      </li>
    );
  }

  return (
    <li className="hover:scale-[1.02] transition-transform">
      <NavigationMenuLink asChild>
        <Link to={route || "/innovations"}>{content}</Link>
      </NavigationMenuLink>
    </li>
  );
};

export function InnovationsMenu() {
  return (
    <ul className="grid gap-3 p-4 md:p-6 md:w-[400px] lg:w-[500px] max-h-[80vh] overflow-y-auto">
      <InnovationItem
        title="Wildlife Tracking AI"
        icon={<Cat className="h-5 w-5" />}
        description="Advanced AI-powered wildlife tracking and monitoring systems"
        badge="New"
      />
      <InnovationItem
        title="Animal Protection Network"
        icon={<Shield className="h-5 w-5" />}
        description="Distributed network for wildlife protection and anti-poaching"
      />
      <InnovationItem
        title="Habitat Analytics"
        icon={<Globe className="h-5 w-5" />}
        description="Real-time monitoring of wildlife habitats and ecosystems"
      />
      <InnovationItem
        title="Species Recognition AI"
        icon={<Brain className="h-5 w-5" />}
        description="Advanced species identification and behavior analysis"
        badge="Beta"
      />
      <InnovationItem
        title="Guardian-IO x Nature Conservancy"
        icon={<Leaf className="h-5 w-5" />}
        description="Business-driven approach to planetary regeneration and conservation"
        badge="New Partnership"
        route="/guardian-nature"
      />
      <InnovationItem
        title="Eco-Tourism"
        icon={<Mountain className="h-5 w-5" />}
        description="Sustainable tourism practices and conservation experiences"
        badge="External"
        route="https://eco-economic-journey.vercel.app/"
        external={true}
      />
      <InnovationItem
        title="Ethical Automotive"
        icon={<Car className="h-5 w-5" />}
        description="Sustainable and ethical practices in automotive industry"
        badge="External"
        route="https://ethical-auto-insights.vercel.app"
        external={true}
      />
      <InnovationItem
        title="Conservation Blockchain"
        icon={<Link2 className="h-5 w-5" />}
        description="Decentralized wildlife conservation tracking system"
        badge="Coming Soon"
      />
    </ul>
  );
}


import { Cat, Shield, Globe, Brain, Link2, Leaf, Angel } from "lucide-react";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

interface ListItemProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  badge?: string;
}

const InnovationItem = ({ title, icon, description, badge }: ListItemProps) => {
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
        <Link to={title === "Divine Guardian Initiative" ? "/divine-guardian" : (title === "Guardian IO & Nature Conservancy" ? "/guardian-nature" : "/innovations")}>{content}</Link>
      </NavigationMenuLink>
    </li>
  );
};

export function InnovationsMenu() {
  return (
    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
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
        title="Conservation Blockchain"
        icon={<Link2 className="h-5 w-5" />}
        description="Decentralized wildlife conservation tracking system"
        badge="Coming Soon"
      />
      <InnovationItem
        title="Guardian IO & Nature Conservancy"
        icon={<Leaf className="h-5 w-5" />}
        description="Ethical supply chains for environmental sustainability"
        badge="Featured"
      />
      <InnovationItem
        title="Divine Guardian Initiative"
        icon={<Shield className="h-5 w-5" />}
        description="Shining Light on Darkness, Protecting the Vulnerable"
        badge="New"
      />
    </ul>
  );
};

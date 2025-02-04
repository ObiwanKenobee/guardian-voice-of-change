import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { Brain, Shield, Zap, Waves } from "lucide-react";

const alienItems = [
  {
    title: "Ipan Synapse Hive",
    description: "Bioware",
    icon: <Brain className="h-5 w-5" />,
    emoji: "👽",
    badge: "Advanced"
  },
  {
    title: "Nimbusian Aeromorphs",
    description: "Exosuits",
    icon: <Shield className="h-5 w-5" />,
    emoji: "🛸",
    badge: "New"
  },
  {
    title: "Monnier Quartz Collective",
    description: "Self-healing infrastructure",
    icon: <Zap className="h-5 w-5" />,
    emoji: "🌌"
  },
  {
    title: "Hypothetical Keplerian Amphibioforms",
    description: "Amphibious nanotech suits",
    icon: <Waves className="h-5 w-5" />,
    emoji: "🌊",
    badge: "Experimental"
  }
];

export function AlienItems() {
  return (
    <>
      {alienItems.map((item) => (
        <AlienListItem key={item.title} {...item} />
      ))}
    </>
  );
}

function AlienListItem({ title, description, icon, emoji, badge }: {
  title: string;
  description: string;
  icon: React.ReactNode;
  emoji: string;
  badge?: string;
}) {
  const content = (
    <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
      <div className="flex items-center gap-2">
        {icon && <span className="text-primary">{icon}</span>}
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium leading-none flex items-center gap-2">
            {title}
            {emoji && <span className="text-base">{emoji}</span>}
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
        <Link to="/innovations">{content}</Link>
      </NavigationMenuLink>
    </li>
  );
}
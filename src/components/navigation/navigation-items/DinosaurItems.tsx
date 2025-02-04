
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { Brain, Shield, Globe, Skull } from "lucide-react";

const dinosaurItems = [
  {
    title: "Tyrannosaurus Rex",
    description: "AI-powered autonomous excavation",
    emoji: "🦖",
    icon: <Skull className="h-5 w-5" />,
    badge: "Premium"
  },
  {
    title: "Velociraptor",
    description: "Swarm AI robotic security",
    emoji: "🏃",
    icon: <Brain className="h-5 w-5" />,
    badge: "Fast"
  },
  {
    title: "Triceratops",
    description: "Next-gen impact-resistant urban architecture",
    emoji: "🦏",
    icon: <Shield className="h-5 w-5" />
  },
  {
    title: "Pterosaurs",
    description: "Ultra-lightweight aerospace materials for hypersonic travel",
    emoji: "🦅",
    icon: <Globe className="h-5 w-5" />
  },
  {
    title: "Ankylosaurus",
    description: "Advanced nano-armor",
    emoji: "🛡️",
    icon: <Shield className="h-5 w-5" />,
    badge: "Protected"
  },
  {
    title: "Iguanodon",
    description: "Bioengineered food processing",
    emoji: "🌿",
    icon: <Brain className="h-5 w-5" />
  },
  {
    title: "Spinosaurus",
    description: "Multi-terrain amphibious drones",
    emoji: "🐊",
    icon: <Globe className="h-5 w-5" />,
    badge: "New"
  }
];

export function DinosaurItems() {
  return (
    <>
      {dinosaurItems.map((item) => (
        <DinosaurListItem key={item.title} {...item} />
      ))}
    </>
  );
}

function DinosaurListItem({ 
  title, 
  description, 
  emoji, 
  icon, 
  badge 
}: {
  title: string;
  description: string;
  emoji: string;
  icon: React.ReactNode;
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

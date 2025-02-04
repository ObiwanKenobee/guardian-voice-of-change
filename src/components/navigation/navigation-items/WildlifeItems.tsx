
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const wildlifeItems = [
  {
    title: "Rhino - Kifaru AI",
    description: "AI-Powered Trade Monitoring System",
    emoji: "🦏",
    badge: "Premium"
  },
  {
    title: "Honeybee BioHive",
    description: "Healthcare Analytics Platform",
    emoji: "🐝",
    badge: "New"
  },
  {
    title: "Termite Colony",
    description: "Distributed Computing Network",
    emoji: "🐜"
  },
  {
    title: "Cheetah Sprint",
    description: "High-Speed Data Processing",
    emoji: "🐆",
    badge: "Fast"
  },
  {
    title: "Baobab Network",
    description: "Sustainable Resource Management",
    emoji: "🌳"
  },
  {
    title: "Lion Guardian",
    description: "Advanced Security Systems",
    emoji: "🦁",
    badge: "Protected"
  },
  {
    title: "Elephant Memory",
    description: "Big Data Storage Solutions",
    emoji: "🐘"
  },
  {
    title: "Hawk Vision",
    description: "Aerial Surveillance System",
    emoji: "🦅"
  },
  {
    title: "Crocodile Defense",
    description: "Robust Security Protocol",
    emoji: "🐊"
  },
  {
    title: "Firefly Beacon",
    description: "IoT Communication Network",
    emoji: "🪰",
    badge: "Beta"
  }
];

export function WildlifeItems() {
  return (
    <>
      {wildlifeItems.map((item) => (
        <WildlifeListItem key={item.title} {...item} />
      ))}
    </>
  );
}

function WildlifeListItem({ title, description, emoji, badge }: {
  title: string;
  description: string;
  emoji: string;
  badge?: string;
}) {
  const content = (
    <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
      <div className="flex items-center gap-2">
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

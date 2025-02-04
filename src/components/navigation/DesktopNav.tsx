import { Link } from "react-router-dom";
import { 
  Layers, 
  Lightbulb, 
  BookOpen, 
  Shield, 
  Globe, 
  BarChart3, 
  Zap, 
  Brain, 
  Link2, 
  Cat,
  Skull 
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { platformFeatures } from "./navigationData";
import { WildlifeItems } from "./navigation-items/WildlifeItems";
import { DinosaurItems } from "./navigation-items/DinosaurItems";
import { AlienItems } from "./navigation-items/AlienItems";

const ListItem = ({
  className,
  title,
  children,
  icon,
  href,
  badge,
  emoji,
  ...props
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  badge?: string;
  emoji?: string;
}) => {
  const content = (
    <a
      className={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className
      )}
      {...props}
    >
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

export default function DesktopNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:bg-primary hover:text-primary-foreground transition-colors">
            <Cat className="mr-2 h-4 w-4" />
            Wildlife
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ScrollArea className="h-[500px]">
              <div className="grid gap-4 p-6">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Present Day</h4>
                  <div className="grid gap-3 w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <WildlifeItems />
                  </div>
                </div>
                
                <div className="pt-4 border-t space-y-2">
                  <h4 className="font-medium leading-none">Prehistoric</h4>
                  <div className="grid gap-3 w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <DinosaurItems />
                  </div>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <h4 className="font-medium leading-none">Alien Species</h4>
                  <div className="grid gap-3 w-[400px] lg:w-[500px] lg:grid-cols-2">
                    <AlienItems />
                  </div>
                </div>
              </div>
            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:bg-primary hover:text-primary-foreground transition-colors">
            <Layers className="mr-2 h-4 w-4" />
            Platform Features
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
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
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:bg-primary hover:text-primary-foreground transition-colors">
            <Lightbulb className="mr-2 h-4 w-4" />
            Innovations
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
              <ListItem
                title="Wildlife Tracking AI"
                icon={<Cat className="h-5 w-5" />}
                href="/innovations"
                badge="New"
              >
                Advanced AI-powered wildlife tracking and monitoring systems
              </ListItem>
              <ListItem
                title="Animal Protection Network"
                icon={<Shield className="h-5 w-5" />}
                href="/innovations"
              >
                Distributed network for wildlife protection and anti-poaching
              </ListItem>
              <ListItem
                title="Habitat Analytics"
                icon={<Globe className="h-5 w-5" />}
                href="/innovations"
              >
                Real-time monitoring of wildlife habitats and ecosystems
              </ListItem>
              <ListItem
                title="Species Recognition AI"
                icon={<Brain className="h-5 w-5" />}
                href="/innovations"
                badge="Beta"
              >
                Advanced species identification and behavior analysis
              </ListItem>
              <ListItem
                title="Conservation Blockchain"
                icon={<Link2 className="h-5 w-5" />}
                href="/innovations"
                badge="Coming Soon"
              >
                Decentralized wildlife conservation tracking system
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:bg-primary hover:text-primary-foreground transition-colors">
            <BookOpen className="mr-2 h-4 w-4" />
            Resources
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px]">
              <ListItem
                title="Resource Library"
                icon={<BookOpen className="h-5 w-5" />}
                href="/resources"
                badge="Updated"
              >
                Comprehensive guides, reports, and best practices
              </ListItem>
              <ListItem
                title="Global Impact"
                icon={<Globe className="h-5 w-5" />}
                href="/resources"
              >
                Real-world case studies and success stories
              </ListItem>
              <ListItem
                title="Analytics Hub"
                icon={<BarChart3 className="h-5 w-5" />}
                href="/resources"
                badge="Pro"
              >
                Advanced metrics and performance insights
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

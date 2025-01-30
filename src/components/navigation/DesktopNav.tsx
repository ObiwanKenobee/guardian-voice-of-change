import { Link } from "react-router-dom";
import { Home, Layers, Lightbulb, BookOpen, Shield, Globe, BarChart3, Zap, Brain, Link2 } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { platformFeatures, innovations } from "./navigationData";

const ListItem = ({
  className,
  title,
  children,
  icon,
  href,
  badge,
  ...props
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  badge?: string;
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
          <div className="text-sm font-medium leading-none">{title}</div>
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

export const DesktopNav = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={cn(
              navigationMenuTriggerStyle(),
              "hover:bg-primary hover:text-primary-foreground transition-colors"
            )}>
              <Home className="mr-2 h-4 w-4" />
              Home
            </NavigationMenuLink>
          </Link>
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
              {innovations.map((item) => (
                <ListItem key={item.title} title={item.title} href="/innovations">
                  {item.description}
                </ListItem>
              ))}
              <ListItem
                title="Fusion-X Intelligence"
                icon={<Brain className="h-5 w-5" />}
                href="/innovations"
                badge="Beta"
              >
                Next-generation AI analytics and predictive modeling
              </ListItem>
              <ListItem
                title="Ultra-Link Blockchain"
                icon={<Link2 className="h-5 w-5" />}
                href="/innovations"
                badge="Coming Soon"
              >
                Decentralized verification and compliance tracking
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
};
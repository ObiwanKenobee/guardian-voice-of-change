import { Link } from "react-router-dom";
import { Home, BookOpen, Users, Lightbulb } from "lucide-react";
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
  ...props
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
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
        <div className="text-sm font-medium leading-none">{title}</div>
      </div>
      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
        {children}
      </p>
    </a>
  );

  return (
    <li>
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
                >
                  {feature.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:bg-primary hover:text-primary-foreground transition-colors">
            Innovations
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
              {innovations.map((item) => (
                <ListItem key={item.title} title={item.title} href="/innovations">
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:bg-primary hover:text-primary-foreground transition-colors">
            Resources
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px]">
              <ListItem title="Resource Library" icon={<BookOpen className="w-6 h-6" />} href="/resources">
                Access guides, reports, and infographics
              </ListItem>
              <ListItem title="Success Stories" icon={<Users className="w-6 h-6" />} href="/resources">
                Explore case studies and impact stories
              </ListItem>
              <ListItem title="Events & Webinars" icon={<Lightbulb className="w-6 h-6" />} href="/resources">
                Join our educational sessions and networking events
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
import { Button } from "@/components/ui/button";
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
import {
  Home,
  Globe,
  Shield,
  Lightbulb,
  BarChart3,
  Users,
  BookOpen,
  LogIn,
} from "lucide-react";
import { Link } from "react-router-dom";

const platformFeatures = [
  {
    title: "Supply Chain Transparency",
    description: "Blockchain-enabled tracking tools and real-time visibility",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    title: "Ethical Sourcing Tools",
    description: "AI-driven supplier audits and risk assessment",
    icon: <Globe className="w-6 h-6" />,
  },
  {
    title: "CSR & ESG Reporting",
    description: "Dynamic dashboards and customizable templates",
    icon: <BarChart3 className="w-6 h-6" />,
  },
];

const innovations = [
  {
    title: "AI-Powered Risk Assessment",
    description: "Predictive analytics for supply chain vulnerabilities",
  },
  {
    title: "Impact Calculators",
    description: "Measure ecological impact of sourcing decisions",
  },
  {
    title: "Educational Modules",
    description: "Interactive training for ethical practices",
  },
];

const ListItem = ({
  className,
  title,
  children,
  icon,
  ...props
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
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
      </NavigationMenuLink>
    </li>
  );
};

export const Navbar = () => {
  return (
    <div className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">Guardian-IO</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Platform Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {platformFeatures.map((feature) => (
                      <ListItem
                        key={feature.title}
                        title={feature.title}
                        icon={feature.icon}
                      >
                        {feature.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Innovations</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                    {innovations.map((item) => (
                      <ListItem key={item.title} title={item.title}>
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px]">
                    <ListItem title="Resource Library" icon={<BookOpen className="w-6 h-6" />}>
                      Access guides, reports, and infographics
                    </ListItem>
                    <ListItem title="Success Stories" icon={<Users className="w-6 h-6" />}>
                      Explore case studies and impact stories
                    </ListItem>
                    <ListItem title="Events & Webinars" icon={<Lightbulb className="w-6 h-6" />}>
                      Join our educational sessions and networking events
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden sm:flex">
            Partner With Us
          </Button>
          <Button>
            <LogIn className="mr-2 h-4 w-4" /> Sign In
          </Button>
        </div>
      </div>
    </div>
  );
};
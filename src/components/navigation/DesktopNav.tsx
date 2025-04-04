
import { Link } from "react-router-dom";
import { Cat, Layers, Lightbulb, Users } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WildlifeItems } from "./navigation-items/WildlifeItems";
import { DinosaurItems } from "./navigation-items/DinosaurItems";
import { AlienItems } from "./navigation-items/AlienItems";
import { PlatformFeatures } from "./navigation-items/PlatformFeatures";
import { InnovationsMenu } from "./navigation-items/InnovationsMenu";
import { ResourcesMenu } from "./navigation-items/ResourcesMenu";

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
            <ScrollArea className="h-[500px] max-w-[95vw]">
              <div className="grid gap-4 md:grid-cols-2 w-[90vw] max-w-[900px] p-4 bg-white">
                <div>
                  <h4 className="font-medium px-3 mb-2 text-primary">Core Features</h4>
                  <PlatformFeatures />
                </div>
                <div>
                  <h4 className="font-medium px-3 mb-2 text-primary">Resources</h4>
                  <ResourcesMenu />
                </div>
              </div>
            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:bg-primary hover:text-primary-foreground transition-colors">
            <Users className="mr-2 h-4 w-4" />
            Explore
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ScrollArea className="h-[400px] max-w-[95vw]">
              <div className="grid gap-4 md:grid-cols-2 w-[70vw] max-w-[700px] p-4 bg-white">
                <div>
                  <h4 className="font-medium px-3 mb-2 text-primary">Our Network</h4>
                  <ul className="grid gap-3 p-4">
                    <li className="row-span-3 hover:scale-[1.02] transition-transform">
                      <Link
                        to="/partner-network"
                        className="flex flex-col justify-between rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md h-full"
                      >
                        <div className="mb-2">
                          <Users className="h-6 w-6 text-primary mb-2" />
                          <div className="text-lg font-medium mb-1">Partner Network</div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Explore our global alliance of organizations working together for sustainability
                          </p>
                        </div>
                        <div className="text-sm text-primary font-medium">
                          View Network →
                        </div>
                      </Link>
                    </li>
                    <li className="hover:scale-[1.02] transition-transform">
                      <Link
                        to="/partner"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Become a Partner</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Join our alliance of forward-thinking organizations
                        </p>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium px-3 mb-2 text-primary">Community & Sustainability</h4>
                  <ul className="grid gap-3 p-4">
                    <li className="hover:scale-[1.02] transition-transform">
                      <Link
                        to="/guardian-nature"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Guardian Nature</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Our initiative to protect and restore natural ecosystems
                        </p>
                      </Link>
                    </li>
                    <li className="hover:scale-[1.02] transition-transform">
                      <Link
                        to="/resources"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Sustainability Resources</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Guides, reports, and tools for sustainable practices
                        </p>
                      </Link>
                    </li>
                    <li className="hover:scale-[1.02] transition-transform">
                      <Link
                        to="/about"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">About Our Mission</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Learn about our vision for a sustainable future
                        </p>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollArea>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:bg-primary hover:text-primary-foreground transition-colors">
            <Lightbulb className="mr-2 h-4 w-4" />
            Innovations
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <InnovationsMenu />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

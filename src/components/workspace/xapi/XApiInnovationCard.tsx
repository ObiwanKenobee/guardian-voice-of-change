
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

export interface Innovation {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  status: "concept" | "planned" | "development" | "alpha" | "beta" | "live";
}

interface XApiInnovationCardProps {
  innovation: Innovation;
  onConnect: () => void;
}

export const XApiInnovationCard = ({ innovation, onConnect }: XApiInnovationCardProps) => {
  const { title, description, icon: Icon, features, status } = innovation;
  
  const statusColors = {
    concept: "bg-slate-100 text-slate-800",
    planned: "bg-blue-100 text-blue-800",
    development: "bg-amber-100 text-amber-800",
    alpha: "bg-purple-100 text-purple-800",
    beta: "bg-green-100 text-green-800",
    live: "bg-green-100 text-green-800"
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2 px-3 sm:px-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <CardTitle className="text-base sm:text-lg">{title}</CardTitle>
          </div>
          <Badge className={`text-xs ${statusColors[status]}`}>
            {status}
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">{description}</p>
      </CardHeader>
      <CardContent className="flex-grow px-3 sm:px-6">
        <ul className="space-y-1">
          {features.map((feature, index) => (
            <li key={index} className="text-xs sm:text-sm flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="px-3 sm:px-6 pb-3 sm:pb-6">
        <Button variant="outline" className="w-full text-xs sm:text-sm" onClick={onConnect}>
          Connect
        </Button>
      </CardFooter>
    </Card>
  );
};


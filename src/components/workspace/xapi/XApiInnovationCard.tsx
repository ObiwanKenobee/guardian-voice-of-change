
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
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <Icon className="h-6 w-6 text-primary" />
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Badge className={statusColors[status]}>
            {status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-1">
          {features.map((feature, index) => (
            <li key={index} className="text-sm flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={onConnect}>
          Connect
        </Button>
      </CardFooter>
    </Card>
  );
};

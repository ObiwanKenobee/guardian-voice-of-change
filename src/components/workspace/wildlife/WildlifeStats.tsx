import { Bird, Map, Trees } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: typeof Bird | typeof Map | typeof Trees;
}

const StatCard = ({ title, value, description, icon: Icon }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

export const WildlifeStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Species Monitored"
        value={156}
        description="12 endangered species"
        icon={Bird}
      />
      <StatCard
        title="Protected Areas"
        value={8}
        description="Total 2,450 hectares"
        icon={Map}
      />
      <StatCard
        title="Conservation Projects"
        value={15}
        description="4 active projects"
        icon={Trees}
      />
    </div>
  );
};
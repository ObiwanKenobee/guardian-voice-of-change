import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stakeholder } from "./StakeholderDashboard";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface StakeholderListProps {
  stakeholders?: Stakeholder[];
  isLoading: boolean;
}

export const StakeholderList = ({ stakeholders, isLoading }: StakeholderListProps) => {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-[250px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-[200px] mb-2" />
              <Skeleton className="h-4 w-[150px]" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stakeholders?.length) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center h-40">
          <p className="text-muted-foreground">No stakeholders found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stakeholders.map((stakeholder) => (
        <Card key={stakeholder.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{stakeholder.name}</span>
              <Badge variant={stakeholder.status === "active" ? "default" : "secondary"}>
                {stakeholder.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Type: {stakeholder.type}</p>
              <p className="text-sm text-muted-foreground">Contact: {stakeholder.contact_email}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
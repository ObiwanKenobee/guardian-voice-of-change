import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RegionComplianceMapProps {
  data: any[];
  isLoading: boolean;
}

export const RegionComplianceMap = ({ data, isLoading }: RegionComplianceMapProps) => {
  if (isLoading) {
    return <div>Loading map data...</div>;
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Global Compliance Map</h3>
            <div className="flex gap-2">
              <Badge variant="outline">Compliant</Badge>
              <Badge variant="destructive">Non-compliant</Badge>
            </div>
          </div>
          <div className="h-[400px] bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">
              Interactive compliance map visualization will be implemented here
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
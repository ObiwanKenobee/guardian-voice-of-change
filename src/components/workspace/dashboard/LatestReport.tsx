
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Report } from "@/types/esg";

interface LatestReportProps {
  reports: Report[];
  isLoadingReports: boolean;
}

export const LatestReport = ({ reports, isLoadingReports }: LatestReportProps) => {
  const getLatestReport = () => {
    if (!reports.length) return null;
    return reports[0];
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Latest Report</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoadingReports ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div>
            {getLatestReport() ? (
              <div className="space-y-2">
                <h4 className="font-medium">{getLatestReport()?.title}</h4>
                <p className="text-sm text-muted-foreground">
                  Type: {getLatestReport()?.report_type}
                </p>
                <Badge>{getLatestReport()?.status}</Badge>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No reports available</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

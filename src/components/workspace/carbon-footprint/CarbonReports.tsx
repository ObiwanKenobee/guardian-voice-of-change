
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Download, FileText, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const CarbonReports = () => {
  const { toast } = useToast();
  const [reportType, setReportType] = useState<string>("monthly");
  
  const { data: reportData, isLoading } = useQuery({
    queryKey: ['carbon-reports', reportType],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('carbon_footprint_data')
        .select('*')
        .order('timestamp', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const handleExportReport = () => {
    try {
      // Create report data
      const reportContent = reportData?.map(item => ({
        date: new Date(item.timestamp).toLocaleDateString(),
        emission_value: item.emission_value,
        emission_unit: item.emission_unit,
        emission_scope: item.emission_scope,
        source_type: item.source_type,
        source_name: item.source_name,
        location: item.location
      }));

      // Convert to CSV
      const csvContent = "data:text/csv;charset=utf-8," 
        + Object.keys(reportContent?.[0] || {}).join(",") + "\n"
        + reportContent?.map(row => Object.values(row).join(",")).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `carbon-report-${reportType}-${new Date().toISOString()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Report exported successfully",
        description: "Your report has been downloaded as a CSV file.",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting your report.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Generate Report</span>
            <Button onClick={handleExportReport} disabled={isLoading}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Report Type</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly Summary</SelectItem>
                    <SelectItem value="quarterly">Quarterly Analysis</SelectItem>
                    <SelectItem value="annual">Annual Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-4">
                {reportData?.slice(0, 5).map((entry) => (
                  <Card key={entry.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <FileText className="h-8 w-8 text-primary" />
                          <div>
                            <p className="font-medium">{entry.source_name}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(entry.timestamp).toLocaleDateString()} - {entry.emission_value} {entry.emission_unit}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {entry.emission_scope}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

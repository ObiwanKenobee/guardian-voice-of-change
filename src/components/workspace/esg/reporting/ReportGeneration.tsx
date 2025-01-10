import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const ReportGeneration = () => {
  const [selectedFramework, setSelectedFramework] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    if (!selectedFramework) {
      toast.error("Please select a reporting framework");
      return;
    }

    setIsGenerating(true);
    try {
      const { data: metrics } = await supabase
        .from('esg_metrics')
        .select('*')
        .order('timestamp', { ascending: false });

      // Simulate report generation delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success("Report generated successfully");
      // Here you would typically handle the download
    } catch (error) {
      toast.error("Failed to generate report");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate ESG Report
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Reporting Framework</label>
            <Select value={selectedFramework} onValueChange={setSelectedFramework}>
              <SelectTrigger>
                <SelectValue placeholder="Select framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gri">Global Reporting Initiative (GRI)</SelectItem>
                <SelectItem value="sasb">SASB Standards</SelectItem>
                <SelectItem value="sdg">UN Sustainable Development Goals</SelectItem>
                <SelectItem value="tcfd">TCFD Framework</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleGenerateReport} 
            disabled={isGenerating || !selectedFramework}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Report...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Generate Report
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
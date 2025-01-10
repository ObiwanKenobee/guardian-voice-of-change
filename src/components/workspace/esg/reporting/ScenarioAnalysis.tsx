import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export const ScenarioAnalysis = () => {
  const [carbonReduction, setCarbonReduction] = useState(0);
  const [renewableEnergy, setRenewableEnergy] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scenarioData, setScenarioData] = useState<any[]>([]);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate sample scenario data
      const data = Array.from({ length: 12 }, (_, i) => ({
        month: `Month ${i + 1}`,
        baseline: 100 + Math.random() * 10,
        projected: (100 + Math.random() * 10) * (1 + (carbonReduction + renewableEnergy) / 200)
      }));
      
      setScenarioData(data);
      toast.success("Scenario analysis completed");
    } catch (error) {
      toast.error("Failed to analyze scenario");
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            ESG Impact Scenario Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Carbon Reduction Target (%)</label>
              <Slider
                value={[carbonReduction]}
                onValueChange={(value) => setCarbonReduction(value[0])}
                max={100}
                step={1}
              />
              <span className="text-sm text-muted-foreground">{carbonReduction}% reduction</span>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Renewable Energy Adoption (%)</label>
              <Slider
                value={[renewableEnergy]}
                onValueChange={(value) => setRenewableEnergy(value[0])}
                max={100}
                step={1}
              />
              <span className="text-sm text-muted-foreground">{renewableEnergy}% adoption</span>
            </div>

            <Button 
              onClick={handleAnalyze} 
              disabled={isAnalyzing}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Run Analysis"
              )}
            </Button>
          </div>

          {scenarioData.length > 0 && (
            <div className="h-[300px] mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scenarioData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="baseline" stroke="#94a3b8" name="Baseline" />
                  <Line type="monotone" dataKey="projected" stroke="#6366f1" name="Projected" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
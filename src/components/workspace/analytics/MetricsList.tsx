import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MetricForm } from "./MetricForm";
import { useToast } from "@/hooks/use-toast";

export const MetricsList = () => {
  const { toast } = useToast();
  const { data: metrics, isLoading, refetch } = useQuery({
    queryKey: ["custom-metrics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("custom_metrics")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("custom_metrics")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Metric deleted successfully",
      });
      refetch();
    } catch (error) {
      console.error("Error deleting metric:", error);
      toast({
        title: "Error",
        description: "Failed to delete metric. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading metrics...</div>;
  }

  return (
    <div className="space-y-4">
      {metrics?.map((metric) => (
        <Card key={metric.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">{metric.name}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge>{metric.metric_type}</Badge>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <MetricForm initialData={metric} onSuccess={refetch} />
                </DialogContent>
              </Dialog>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(metric.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{metric.description}</p>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="outline">{metric.visualization_type}</Badge>
              <Badge variant="outline">{metric.data_source}</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
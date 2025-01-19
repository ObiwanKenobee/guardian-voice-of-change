import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { MetricForm } from "./MetricForm";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const MetricsList = () => {
  const { toast } = useToast();
  const { data: metrics, isLoading, isError, error, refetch } = useQuery({
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
    } catch (error: any) {
      console.error("Error deleting metric:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete metric. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading metrics...</div>;
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : "Failed to load metrics"}
        </AlertDescription>
      </Alert>
    );
  }

  if (!metrics?.length) {
    return (
      <Alert>
        <AlertTitle>No metrics found</AlertTitle>
        <AlertDescription>
          Create your first metric by clicking the "Add Metric" button above.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {metrics?.map((metric) => (
        <Card key={metric.id} className="group">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">{metric.name}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge>{metric.metric_type}</Badge>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Metric</DialogTitle>
                    <DialogDescription>
                      Make changes to your metric here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <MetricForm initialData={metric} onSuccess={refetch} />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Metric</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this metric? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => {}}>Cancel</Button>
                    <Button 
                      variant="destructive" 
                      onClick={() => handleDelete(metric.id)}
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
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
import { CarbonDataForm } from "./CarbonDataForm";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const CarbonDataList = () => {
  const { toast } = useToast();
  const { data: entries, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["carbon-footprint-data"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("carbon_footprint_data")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("carbon_footprint_data")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Carbon footprint entry deleted successfully",
      });
      refetch();
    } catch (error: any) {
      console.error("Error deleting entry:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete entry",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Loading entries...</div>;
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : "Failed to load entries"}
        </AlertDescription>
      </Alert>
    );
  }

  if (!entries?.length) {
    return (
      <Alert>
        <AlertTitle>No entries found</AlertTitle>
        <AlertDescription>
          Create your first carbon footprint entry using the form above.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <Card key={entry.id} className="group">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">
                {entry.emission_value} {entry.emission_unit}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{entry.source_name}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge>{entry.emission_scope}</Badge>
              <Badge variant="outline">{entry.source_type}</Badge>
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
                    <DialogTitle>Edit Entry</DialogTitle>
                    <DialogDescription>
                      Make changes to your carbon footprint entry here.
                    </DialogDescription>
                  </DialogHeader>
                  <CarbonDataForm initialData={entry} onSuccess={refetch} />
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
                    <DialogTitle>Delete Entry</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this entry? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => {}}>Cancel</Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(entry.id)}
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {entry.location && (
              <p className="text-sm text-muted-foreground">Location: {entry.location}</p>
            )}
            <p className="text-sm text-muted-foreground">
              Added: {new Date(entry.created_at).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CreateRoundtableForm } from "./CreateRoundtableForm";

interface Roundtable {
  id: string;
  title: string;
  description: string | null;
  topic: string;
  scheduled_for: string;
  status: string;
  max_participants: number | null;
}

export const VirtualRoundtables = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: roundtables, isLoading } = useQuery({
    queryKey: ["roundtables"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("virtual_roundtables")
        .select("*")
        .order("scheduled_for", { ascending: true });

      if (error) throw error;
      return data as Roundtable[];
    },
  });

  if (isLoading) {
    return <div>Loading roundtables...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Virtual Roundtables</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Host Roundtable</Button>
          </DialogTrigger>
          <DialogContent>
            <CreateRoundtableForm onSuccess={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roundtables?.map((roundtable) => (
          <Card key={roundtable.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg">{roundtable.title}</span>
                <Badge>{roundtable.status}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{roundtable.description}</p>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(roundtable.scheduled_for).toLocaleDateString()}
                  </span>
                </div>
                {roundtable.max_participants && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4" />
                    <span>Max {roundtable.max_participants} participants</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
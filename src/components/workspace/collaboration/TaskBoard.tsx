import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type Task = Tables<"tasks">;
type TaskStatus = "todo" | "in_progress" | "done";

const TaskBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const { isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTasks(data || []);
      return data;
    },
  });

  const groupedTasks = tasks.reduce(
    (acc, task) => {
      const status = task.status || "todo";
      acc[status] = [...(acc[status] || []), task];
      return acc;
    },
    {} as Record<TaskStatus, Task[]>
  );

  const columns: { id: TaskStatus; title: string }[] = [
    { id: "todo", title: "To Do" },
    { id: "in_progress", title: "In Progress" },
    { id: "done", title: "Done" },
  ];

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Task Board</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4 flex-1">
        {columns.map((column) => (
          <Card key={column.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{column.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              {groupedTasks[column.id]?.map((task) => (
                <div
                  key={task.id}
                  className="p-4 mb-2 bg-card border rounded-lg shadow-sm"
                >
                  <h3 className="font-medium">{task.title}</h3>
                  {task.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {task.description}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { TaskBoard };
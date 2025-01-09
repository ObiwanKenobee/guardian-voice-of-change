import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, Link as LinkIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type Task = Tables<"tasks">;
type TaskStatus = "todo" | "in_progress" | "done";

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
    case "medium":
      return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
    case "low":
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
    default:
      return "bg-muted";
  }
};

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
              <CardTitle className="flex items-center justify-between">
                {column.title}
                <Badge variant="outline" className="ml-2">
                  {groupedTasks[column.id]?.length || 0}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-2">
              {groupedTasks[column.id]?.map((task) => (
                <Card key={task.id} className="p-4 cursor-pointer hover:bg-accent transition-colors">
                  <h3 className="font-medium">{task.title}</h3>
                  {task.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {task.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    {task.due_date && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(task.due_date).toLocaleDateString()}
                      </Badge>
                    )}
                    <Badge variant="outline" className={getPriorityColor(task.priority || 'low')}>
                      {task.priority || 'low'}
                    </Badge>
                    {task.has_dependencies && (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <LinkIcon className="h-3 w-3" />
                        Dependencies
                      </Badge>
                    )}
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export { TaskBoard };
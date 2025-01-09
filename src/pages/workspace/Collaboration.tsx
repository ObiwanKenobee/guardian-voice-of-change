import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskBoard } from "@/components/workspace/collaboration/TaskBoard";
import { MessagingSystem } from "@/components/workspace/collaboration/MessagingSystem";
import { GlobalForum } from "@/components/workspace/collaboration/GlobalForum";

const Collaboration = () => {
  return (
    <div className="h-full flex flex-col gap-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Work Smarter, Together</h1>
        <p className="text-muted-foreground text-lg">
          Streamline teamwork, foster partnerships, and drive impactful collaborations 
          to tackle supply chain challenges effectively.
        </p>
      </div>

      <Tabs defaultValue="tasks" className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            Task Board
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            Messages
          </TabsTrigger>
          <TabsTrigger value="forum" className="flex items-center gap-2">
            Global Forum
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tasks" className="flex-1 mt-6">
          <TaskBoard />
        </TabsContent>
        <TabsContent value="messages" className="flex-1 mt-6">
          <MessagingSystem />
        </TabsContent>
        <TabsContent value="forum" className="flex-1 mt-6">
          <GlobalForum />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Collaboration;
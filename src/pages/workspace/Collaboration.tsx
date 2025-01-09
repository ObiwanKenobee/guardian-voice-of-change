import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskBoard } from "@/components/workspace/collaboration/TaskBoard";
import { MessagingSystem } from "@/components/workspace/collaboration/MessagingSystem";
import { GlobalForum } from "@/components/workspace/collaboration/GlobalForum";

const Collaboration = () => {
  return (
    <div className="h-full flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Work Smarter, Together</h1>
        <p className="text-muted-foreground mt-2">
          Assign tasks, engage stakeholders, and collaborate with partners to tackle supply chain challenges.
        </p>
      </div>

      <Tabs defaultValue="tasks" className="flex-1 flex flex-col">
        <TabsList>
          <TabsTrigger value="tasks">Task Board</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="forum">Global Forum</TabsTrigger>
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WildlifeStats } from "@/components/workspace/wildlife/WildlifeStats";
import { WildlifeMonitoring } from "@/components/workspace/wildlife/WildlifeMonitoring";
import { ConservationProjects } from "@/components/workspace/wildlife/ConservationProjects";

const Wildlife = () => {
  return (
    <div className="h-full flex flex-col gap-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Wildlife Insights</h1>
        <p className="text-muted-foreground text-lg">
          Monitor and protect wildlife in your operational areas
        </p>
      </div>

      <Tabs defaultValue="overview" className="flex-1">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="conservation">Conservation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <WildlifeStats />
        </TabsContent>
        
        <TabsContent value="monitoring" className="h-full">
          <WildlifeMonitoring />
        </TabsContent>
        
        <TabsContent value="conservation" className="h-full">
          <ConservationProjects />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Wildlife;
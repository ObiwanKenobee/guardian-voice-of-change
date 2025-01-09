import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bird, Map, Trees } from "lucide-react";

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
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Species Monitored</CardTitle>
                <Bird className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">12 endangered species</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Protected Areas</CardTitle>
                <Map className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Total 2,450 hectares</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conservation Projects</CardTitle>
                <Trees className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">4 active projects</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="monitoring" className="h-full">
          <Card>
            <CardHeader>
              <CardTitle>Wildlife Monitoring</CardTitle>
              <CardDescription>Track and analyze wildlife activity</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Monitoring data coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="conservation" className="h-full">
          <Card>
            <CardHeader>
              <CardTitle>Conservation Projects</CardTitle>
              <CardDescription>Active conservation initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Conservation projects content coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Wildlife;
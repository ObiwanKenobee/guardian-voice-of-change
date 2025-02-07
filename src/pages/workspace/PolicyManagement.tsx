import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PolicyLibrary } from "@/components/workspace/policy/PolicyLibrary";
import { PolicyCreation } from "@/components/workspace/policy/PolicyCreation";
import { PolicyApprovals } from "@/components/workspace/policy/PolicyApprovals";
import { PolicyCompliance } from "@/components/workspace/policy/PolicyCompliance";

export default function PolicyManagement() {
  const [activeTab, setActiveTab] = useState("library");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Policy Management</h1>
        <p className="text-muted-foreground">
          Create, manage, and track organizational policies and compliance
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="library">Policy Library</TabsTrigger>
          <TabsTrigger value="create">Create Policy</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="space-y-4">
          <PolicyLibrary />
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <PolicyCreation />
        </TabsContent>

        <TabsContent value="approvals" className="space-y-4">
          <PolicyApprovals />
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <PolicyCompliance />
        </TabsContent>
      </Tabs>
    </div>
  );
}
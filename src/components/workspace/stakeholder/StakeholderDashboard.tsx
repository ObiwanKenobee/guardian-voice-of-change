import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StakeholderList } from "./StakeholderList";
import { StakeholderForm } from "./StakeholderForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export type Stakeholder = {
  id: string;
  name: string;
  partnership_type: string;
  contact_email: string | null;
  status: "active" | "pending" | "inactive";
  created_at: string;
};

export const StakeholderDashboard = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const { data: stakeholders, isLoading } = useQuery({
    queryKey: ["stakeholders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Stakeholder[];
    },
  });

  const filteredStakeholders = stakeholders?.filter((stakeholder) => {
    if (activeTab === "all") return true;
    return stakeholder.partnership_type === activeTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Stakeholders</TabsTrigger>
            <TabsTrigger value="supplier">Suppliers</TabsTrigger>
            <TabsTrigger value="regulator">Regulators</TabsTrigger>
            <TabsTrigger value="partner">Partners</TabsTrigger>
          </TabsList>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="ml-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Stakeholder
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <StakeholderForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>

          <TabsContent value="all" className="mt-6">
            <StakeholderList stakeholders={filteredStakeholders} isLoading={isLoading} />
          </TabsContent>
          <TabsContent value="supplier" className="mt-6">
            <StakeholderList stakeholders={filteredStakeholders} isLoading={isLoading} />
          </TabsContent>
          <TabsContent value="regulator" className="mt-6">
            <StakeholderList stakeholders={filteredStakeholders} isLoading={isLoading} />
          </TabsContent>
          <TabsContent value="partner" className="mt-6">
            <StakeholderList stakeholders={filteredStakeholders} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
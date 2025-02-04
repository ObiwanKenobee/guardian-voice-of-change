
import { useState } from "react";
import { Leaf, BarChart3, Globe, AlertTriangle, ArrowUpDown } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CarbonDataForm } from "@/components/workspace/carbon-footprint/CarbonDataForm";
import { CarbonDataList } from "@/components/workspace/carbon-footprint/CarbonDataList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CarbonFootprint = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Hero Section */}
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <Leaf className="h-6 w-6 md:h-8 md:w-8 text-green-500" />
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">Carbon Footprint Management</h1>
        </motion.div>
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl">
          Track and manage your organization's carbon emissions across Scope 1, 2, and 3 categories.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="animate-fade-in">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <BarChart3 className="h-4 w-4 text-primary" />
              Total Emissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">2.5M tCO₂e</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↓ 12%</span> vs. last year
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in delay-100">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <Globe className="h-4 w-4 text-primary" />
              Scope Coverage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">All scopes tracked</p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in delay-200">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <AlertTriangle className="h-4 w-4 text-primary" />
              Risk Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">Low</div>
            <p className="text-xs text-muted-foreground">Based on current data</p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in delay-300">
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <ArrowUpDown className="h-4 w-4 text-primary" />
              Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold">Decreasing</div>
            <p className="text-xs text-muted-foreground">Monthly average</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="entries" className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="entries">Entries</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">Add New Entry</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add Carbon Footprint Entry</DialogTitle>
              </DialogHeader>
              <CarbonDataForm onSuccess={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <TabsContent value="entries" className="space-y-6">
          <CarbonDataList />
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Carbon Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Analytics features coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Carbon Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Reporting features coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CarbonFootprint;

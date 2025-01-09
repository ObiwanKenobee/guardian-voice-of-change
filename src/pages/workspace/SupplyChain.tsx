import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SupplyChainOverview } from "@/components/workspace/supply-chain/SupplyChainOverview";
import { ShipmentTracking } from "@/components/workspace/supply-chain/ShipmentTracking";
import { SupplierDirectory } from "@/components/workspace/supply-chain/SupplierDirectory";

const SupplyChain = () => {
  return (
    <div className="h-full flex flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Supply Chain Management</h1>
        <p className="text-muted-foreground text-lg">
          Monitor and optimize your supply chain operations
        </p>
      </div>

      <Tabs defaultValue="overview" className="flex-1">
        <TabsList className="grid w-full grid-cols-3 h-12">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tracking">Shipment Tracking</TabsTrigger>
          <TabsTrigger value="suppliers">Supplier Directory</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <SupplyChainOverview />
        </TabsContent>
        
        <TabsContent value="tracking" className="space-y-4">
          <ShipmentTracking />
        </TabsContent>
        
        <TabsContent value="suppliers" className="space-y-4">
          <SupplierDirectory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplyChain;
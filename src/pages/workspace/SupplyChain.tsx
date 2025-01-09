import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Truck, Package, Globe, Search, AlertTriangle, 
  CheckCircle2, Clock, Building2, MapPin, Phone, Mail 
} from "lucide-react";

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
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">6 arriving today</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Inventory Items</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">85% in stock</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Global Suppliers</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">48</div>
                <p className="text-xs text-muted-foreground">Across 12 countries</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="tracking" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Shipment Tracking</CardTitle>
                  <CardDescription>Monitor all active shipments in real-time</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <InputWithIcon 
                    placeholder="Search shipments..." 
                    className="w-[300px]"
                    icon={Search}
                  />
                  <Button>
                    <Package className="mr-2 h-4 w-4" />
                    New Shipment
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((shipment) => (
                    <Card key={shipment}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">Shipment #{shipment}0234</h3>
                            <p className="text-sm text-muted-foreground">
                              From: Shanghai, CN • To: Los Angeles, USA
                            </p>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={
                              shipment === 1 
                                ? "bg-red-500/10 text-red-500" 
                                : shipment === 2 
                                ? "bg-yellow-500/10 text-yellow-500"
                                : "bg-green-500/10 text-green-500"
                            }
                          >
                            {shipment === 1 
                              ? <AlertTriangle className="mr-1 h-3 w-3" />
                              : shipment === 2 
                              ? <Clock className="mr-1 h-3 w-3" />
                              : <CheckCircle2 className="mr-1 h-3 w-3" />
                            }
                            {shipment === 1 
                              ? "Delayed" 
                              : shipment === 2 
                              ? "In Transit"
                              : "On Time"
                            }
                          </Badge>
                        </div>
                        <div className="mt-4 grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Carrier</p>
                            <p className="font-medium">Maersk Line</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Departure</p>
                            <p className="font-medium">Oct 12, 2023</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Arrival</p>
                            <p className="font-medium">Oct 28, 2023</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Status</p>
                            <p className="font-medium">Port of Singapore</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Supplier Directory</CardTitle>
                  <CardDescription>Manage your supplier relationships</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <InputWithIcon 
                    placeholder="Search suppliers..." 
                    className="w-[300px]"
                    icon={Search}
                  />
                  <Button>
                    <Building2 className="mr-2 h-4 w-4" />
                    Add Supplier
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((supplier) => (
                    <Card key={supplier}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                              <Building2 className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div>
                              <h3 className="font-semibold">Eco Textiles Co., Ltd</h3>
                              <p className="text-sm text-muted-foreground">
                                Sustainable Fabric Manufacturing
                              </p>
                            </div>
                          </div>
                          <Badge 
                            variant="outline" 
                            className="bg-green-500/10 text-green-500"
                          >
                            Verified Partner
                          </Badge>
                        </div>
                        <div className="mt-4 grid grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>Bangkok, Thailand</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>+66 2 123 4567</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>contact@ecotextiles.com</span>
                          </div>
                          <div className="flex justify-end">
                            <Button variant="outline" size="sm">View Profile</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplyChain;
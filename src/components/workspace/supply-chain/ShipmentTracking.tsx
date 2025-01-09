import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package, Search, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

export const ShipmentTracking = () => {
  return (
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
  );
};
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Building2, Search, MapPin, Phone, Mail } from "lucide-react";

export const SupplierDirectory = () => {
  return (
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
  );
};
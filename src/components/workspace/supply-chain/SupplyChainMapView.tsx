import { useEffect, useRef, useState } from 'react';
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const SupplyChainMapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [nodes, setNodes] = useState<any[]>([]);
  const [routes, setRoutes] = useState<any[]>([]);

  useEffect(() => {
    const fetchSupplyChainData = async () => {
      try {
        const [nodesResponse, routesResponse] = await Promise.all([
          supabase.from('supply_chain_nodes').select('*'),
          supabase.from('supply_chain_routes').select('*')
        ]);

        if (nodesResponse.error) throw nodesResponse.error;
        if (routesResponse.error) throw routesResponse.error;

        setNodes(nodesResponse.data || []);
        setRoutes(routesResponse.data || []);
      } catch (error) {
        console.error('Error fetching supply chain data:', error);
        toast({
          title: "Error",
          description: "Failed to load supply chain data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSupplyChainData();
  }, [toast]);

  if (isLoading) {
    return (
      <Card className="w-full h-[600px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </Card>
    );
  }

  return (
    <Card className="w-full h-[600px] relative overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="text-center space-y-2">
            <p className="text-lg font-semibold">No Supply Chain Data</p>
            <p className="text-sm text-muted-foreground">
              Add locations and routes to visualize your supply chain
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};
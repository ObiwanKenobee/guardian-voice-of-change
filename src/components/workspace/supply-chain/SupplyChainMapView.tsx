
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, AlertTriangle } from "lucide-react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapInitializer } from './map/MapInitializer';
import { NodeMarkers } from './map/NodeMarkers';
import { SupplyChainRoutes } from './map/SupplyChainRoutes';
import { NodeDetailsPanel } from './map/NodeDetailsPanel';
import type { SupplyChainNode, SupplyChainRoute } from './types';

export const SupplyChainMapView = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [nodes, setNodes] = useState<SupplyChainNode[]>([]);
  const [routes, setRoutes] = useState<SupplyChainRoute[]>([]);
  const [selectedNode, setSelectedNode] = useState<SupplyChainNode | null>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

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
        setRoutes(routesResponse.data?.map(route => ({
          ...route,
          estimated_time: route.estimated_time?.toString() || '',
          actual_time: route.actual_time?.toString(),
        })) || []);
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

    const channel = supabase
      .channel('supply-chain-updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'supply_chain_nodes' },
        () => fetchSupplyChainData()
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'supply_chain_routes' },
        () => fetchSupplyChainData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const handleMapLoad = (loadedMap: mapboxgl.Map) => {
    setMap(loadedMap);
    loadedMap.addSource('mapbox-dem', {
      'type': 'raster-dem',
      'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
      'tileSize': 512,
      'maxzoom': 14
    });
    
    loadedMap.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
    loadedMap.setFog({
      'color': 'rgb(186, 210, 235)',
      'high-color': 'rgb(36, 92, 223)',
      'horizon-blend': 0.02,
      'space-color': 'rgb(11, 11, 25)',
      'star-intensity': 0.6
    });
  };

  if (isLoading) {
    return (
      <Card className="w-full h-[calc(100vh-20rem)] sm:h-[600px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </Card>
    );
  }

  return (
    <Card className="w-full h-[calc(100vh-20rem)] sm:h-[600px] relative overflow-hidden">
      <MapInitializer
        nodes={nodes}
        onMapLoad={handleMapLoad}
        onNodeSelect={setSelectedNode}
      />
      
      {map && (
        <>
          <NodeMarkers
            map={map}
            nodes={nodes}
            onNodeSelect={setSelectedNode}
          />
          <SupplyChainRoutes
            map={map}
            routes={routes}
            nodes={nodes}
          />
        </>
      )}
      
      {selectedNode && (
        <NodeDetailsPanel
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
        />
      )}

      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="text-center space-y-2 p-4">
            <AlertTriangle className="h-8 w-8 mx-auto text-muted-foreground" />
            <p className="text-lg font-semibold">No Supply Chain Data</p>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Add locations and routes to visualize your supply chain
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

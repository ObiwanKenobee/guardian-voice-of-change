import { useEffect, useRef, useState } from 'react';
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export const SupplyChainMapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
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
        
        // Initialize map after data is loaded
        initializeMap(nodesResponse.data || []);
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

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [toast]);

  const initializeMap = (nodes: any[]) => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      projection: 'globe',
      zoom: 1.5,
      center: [0, 20],
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add nodes to map
    map.current.on('load', () => {
      if (!map.current) return;

      // Add markers for each node
      nodes.forEach(node => {
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundColor = getLocationTypeColor(node.location_type);
        el.style.width = '15px';
        el.style.height = '15px';
        el.style.borderRadius = '50%';
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';

        new mapboxgl.Marker(el)
          .setLngLat([node.longitude, node.latitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <strong>${node.name}</strong><br>
                Type: ${node.location_type}<br>
                Status: ${node.status}
              `)
          )
          .addTo(map.current);
      });

      // Add atmosphere and fog effects
      map.current.setFog({
        'color': 'rgb(255, 255, 255)',
        'high-color': 'rgb(200, 200, 225)',
        'horizon-blend': 0.2,
      });
    });
  };

  const getLocationTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'warehouse':
        return '#3b82f6'; // blue
      case 'distribution':
        return '#22c55e'; // green
      case 'manufacturing':
        return '#f97316'; // orange
      default:
        return '#6b7280'; // gray
    }
  };

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
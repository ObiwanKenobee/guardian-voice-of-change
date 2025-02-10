
import { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, AlertTriangle } from "lucide-react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Badge } from "@/components/ui/badge";

interface SupplyChainNode {
  id: string;
  name: string;
  location_type: string;
  latitude: number;
  longitude: number;
  status: string;
  facility_type: string;
  inventory_level: number;
  capacity: number;
  risk_score: number;
}

interface SupplyChainRoute {
  id: string;
  origin_id: string;
  destination_id: string;
  route_type: string;
  status: string;
  transportation_mode: string;
  risk_level: string;
  estimated_time: string;
  actual_time?: string;
  distance: number;
}

export const SupplyChainMapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [nodes, setNodes] = useState<SupplyChainNode[]>([]);
  const [routes, setRoutes] = useState<SupplyChainRoute[]>([]);
  const [selectedNode, setSelectedNode] = useState<SupplyChainNode | null>(null);

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
        // Cast the route data to ensure proper typing
        setRoutes(routesResponse.data?.map(route => ({
          ...route,
          estimated_time: route.estimated_time?.toString() || '',
          actual_time: route.actual_time?.toString(),
        })) || []);
        
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

    // Set up real-time subscription
    const channel = supabase
      .channel('supply-chain-updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'supply_chain_nodes' },
        (payload) => {
          console.log('Node update received:', payload);
          fetchSupplyChainData(); // Refresh data on changes
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'supply_chain_routes' },
        (payload) => {
          console.log('Route update received:', payload);
          fetchSupplyChainData(); // Refresh data on changes
        }
      )
      .subscribe();

    return () => {
      if (map.current) {
        map.current.remove();
      }
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const initializeMap = (nodes: SupplyChainNode[]) => {
    if (!mapContainer.current) return;

    // Get Mapbox token from Supabase Edge Function
    const getMapboxToken = async () => {
      const { data: { MAPBOX_PUBLIC_TOKEN }, error } = await supabase.functions.invoke('get-mapbox-token');
      if (error) throw error;
      return MAPBOX_PUBLIC_TOKEN;
    };

    getMapboxToken().then(token => {
      mapboxgl.accessToken = token;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        projection: 'globe',
        zoom: 1.5,
        center: [0, 20],
        pitch: 45,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      map.current.on('load', () => {
        if (!map.current) return;

        // Add 3D terrain
        map.current.addSource('mapbox-dem', {
          'type': 'raster-dem',
          'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
          'tileSize': 512,
          'maxzoom': 14
        });
        
        map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

        // Add atmosphere and fog effects
        map.current.setFog({
          'color': 'rgb(186, 210, 235)',
          'high-color': 'rgb(36, 92, 223)',
          'horizon-blend': 0.02,
          'space-color': 'rgb(11, 11, 25)',
          'star-intensity': 0.6
        });

        // Add nodes as 3D markers
        nodes.forEach(node => {
          const el = document.createElement('div');
          el.className = 'marker';
          el.style.backgroundColor = getFacilityTypeColor(node.facility_type);
          el.style.width = '15px';
          el.style.height = '15px';
          el.style.borderRadius = '50%';
          el.style.border = '2px solid white';
          el.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';

          const marker = new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
          })
            .setLngLat([node.longitude, node.latitude])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 })
                .setHTML(`
                  <div class="p-2">
                    <h3 class="font-bold">${node.name}</h3>
                    <p>Type: ${node.facility_type}</p>
                    <p>Status: ${node.status}</p>
                    <p>Inventory: ${node.inventory_level}/${node.capacity}</p>
                    <p>Risk Score: ${node.risk_score}</p>
                  </div>
                `)
            )
            .addTo(map.current);

          marker.getElement().addEventListener('click', () => {
            setSelectedNode(node);
          });
        });

        // Add route lines
        if (routes.length > 0) {
          map.current.addSource('routes', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: routes.map(route => ({
                type: 'Feature',
                geometry: {
                  type: 'LineString',
                  coordinates: [
                    [nodes.find(n => n.id === route.origin_id)?.longitude || 0,
                     nodes.find(n => n.id === route.origin_id)?.latitude || 0],
                    [nodes.find(n => n.id === route.destination_id)?.longitude || 0,
                     nodes.find(n => n.id === route.destination_id)?.latitude || 0]
                  ]
                },
                properties: {
                  risk_level: route.risk_level,
                  transportation_mode: route.transportation_mode
                }
              }))
            }
          });

          map.current.addLayer({
            id: 'routes-line',
            type: 'line',
            source: 'routes',
            paint: {
              'line-color': [
                'match',
                ['get', 'risk_level'],
                'high', '#ef4444',
                'medium', '#f97316',
                '#22c55e'
              ],
              'line-width': 2,
              'line-dasharray': [
                'match',
                ['get', 'transportation_mode'],
                'air', [2, 1],
                'sea', [1, 1],
                [1, 0]
              ]
            }
          });
        }
      });
    });
  };

  const getFacilityTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'warehouse':
        return '#3b82f6';
      case 'distribution':
        return '#22c55e';
      case 'manufacturing':
        return '#f97316';
      default:
        return '#6b7280';
    }
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
      <div ref={mapContainer} className="absolute inset-0" />
      
      {selectedNode && (
        <div className="absolute top-4 right-4 bg-background/95 p-4 rounded-lg shadow-lg max-w-sm">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold">{selectedNode.name}</h3>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-muted-foreground hover:text-foreground"
            >
              ×
            </button>
          </div>
          <div className="mt-2 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Facility Type:</span>
              <Badge variant="outline">{selectedNode.facility_type}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status:</span>
              <Badge>{selectedNode.status}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Inventory:</span>
              <span>{selectedNode.inventory_level}/{selectedNode.capacity}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Risk Score:</span>
              <Badge variant={selectedNode.risk_score > 7 ? "destructive" : "default"}>
                {selectedNode.risk_score}
              </Badge>
            </div>
          </div>
        </div>
      )}

      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="text-center space-y-2 p-4">
            <AlertTriangle className="h-8 w-8 mx-auto text-muted-foreground" />
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

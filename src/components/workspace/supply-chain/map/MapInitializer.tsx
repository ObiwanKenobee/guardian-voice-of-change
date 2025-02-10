
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { SupplyChainNode } from '../types';

interface MapInitializerProps {
  nodes: SupplyChainNode[];
  onMapLoad: (map: mapboxgl.Map) => void;
  onNodeSelect: (node: SupplyChainNode) => void;
}

export const MapInitializer = ({ nodes, onMapLoad, onNodeSelect }: MapInitializerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    const initializeMap = async () => {
      if (!mapContainer.current) return;

      try {
        const { data: { MAPBOX_PUBLIC_TOKEN }, error } = await supabase.functions.invoke('get-mapbox-token');
        if (error) throw error;

        mapboxgl.accessToken = MAPBOX_PUBLIC_TOKEN;
        
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/dark-v11',
          projection: 'globe',
          zoom: 1.5,
          center: [0, 20],
          pitch: 45,
        });

        map.addControl(
          new mapboxgl.NavigationControl({
            visualizePitch: true,
          }),
          'top-right'
        );

        map.on('load', () => {
          if (!mounted) return;

          // Only add terrain if it hasn't been added yet
          if (!map.getSource('mapbox-dem')) {
            map.addSource('mapbox-dem', {
              'type': 'raster-dem',
              'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
              'tileSize': 512,
              'maxzoom': 14
            });
          }
          
          map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
          map.setFog({
            'color': 'rgb(186, 210, 235)',
            'high-color': 'rgb(36, 92, 223)',
            'horizon-blend': 0.02,
            'space-color': 'rgb(11, 11, 25)',
            'star-intensity': 0.6
          });

          mapInstance.current = map;
          onMapLoad(map);
        });

      } catch (error) {
        console.error('Error initializing map:', error);
        toast({
          title: "Error",
          description: "Failed to initialize map",
          variant: "destructive",
        });
      }
    };

    initializeMap();

    return () => {
      mounted = false;
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [onMapLoad, toast]);

  return <div ref={mapContainer} className="absolute inset-0" />;
};

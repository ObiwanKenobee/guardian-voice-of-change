
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
  const map = useRef<mapboxgl.Map | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!mapContainer.current) return;

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
        
        // Add terrain and fog effects
        map.current.addSource('mapbox-dem', {
          'type': 'raster-dem',
          'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
          'tileSize': 512,
          'maxzoom': 14
        });
        
        map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
        map.current.setFog({
          'color': 'rgb(186, 210, 235)',
          'high-color': 'rgb(36, 92, 223)',
          'horizon-blend': 0.02,
          'space-color': 'rgb(11, 11, 25)',
          'star-intensity': 0.6
        });

        onMapLoad(map.current);
      });
    }).catch(error => {
      console.error('Error initializing map:', error);
      toast({
        title: "Error",
        description: "Failed to initialize map",
        variant: "destructive",
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [onMapLoad, toast]);

  return <div ref={mapContainer} className="absolute inset-0" />;
};

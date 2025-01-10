import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const RiskHeatmap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const { data: { MAPBOX_PUBLIC_TOKEN } } = await supabase.functions.invoke('get-mapbox-token');
        
        if (!mapContainer.current || !MAPBOX_PUBLIC_TOKEN) return;

        mapboxgl.accessToken = MAPBOX_PUBLIC_TOKEN;
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/dark-v11',
          zoom: 1.5,
          center: [30, 15],
          pitch: 45,
        });

        // Add navigation controls
        map.current.addControl(
          new mapboxgl.NavigationControl({
            visualizePitch: true,
          }),
          'top-right'
        );

        // Add sample heatmap data
        map.current.on('load', () => {
          map.current?.addSource('risk-points', {
            'type': 'geojson',
            'data': {
              'type': 'FeatureCollection',
              'features': [
                // Sample risk points - these would come from your database in production
                { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [28.0473, -26.2041] }, 'properties': { 'risk': 0.8 } }, // Johannesburg
                { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [37.9062, -0.0236] }, 'properties': { 'risk': 0.9 } }, // Kenya
                { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [16.3738, -2.4783] }, 'properties': { 'risk': 0.7 } }, // Angola
                { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': [30.0444, -1.9403] }, 'properties': { 'risk': 0.85 } }, // Rwanda
              ]
            }
          });

          map.current?.addLayer({
            'id': 'risk-heat',
            'type': 'heatmap',
            'source': 'risk-points',
            'paint': {
              'heatmap-weight': ['get', 'risk'],
              'heatmap-intensity': 1,
              'heatmap-color': [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0, 'rgba(33,102,172,0)',
                0.2, 'rgb(103,169,207)',
                0.4, 'rgb(209,229,240)',
                0.6, 'rgb(253,219,199)',
                0.8, 'rgb(239,138,98)',
                1, 'rgb(178,24,43)'
              ],
              'heatmap-radius': 30
            }
          });
        });

      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initializeMap();

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Risk Heatmap
        </CardTitle>
        <CardDescription>
          AI-powered visualization of high-risk areas for wildlife trafficking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-[16/9] relative rounded-lg overflow-hidden">
          <div ref={mapContainer} className="absolute inset-0" />
        </div>
      </CardContent>
    </Card>
  );
};
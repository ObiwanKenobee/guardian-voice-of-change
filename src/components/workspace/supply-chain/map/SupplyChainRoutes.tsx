
import mapboxgl from 'mapbox-gl';
import type { SupplyChainNode, SupplyChainRoute } from '../types';

interface SupplyChainRoutesProps {
  map: mapboxgl.Map;
  routes: SupplyChainRoute[];
  nodes: SupplyChainNode[];
}

export const SupplyChainRoutes = ({ map, routes, nodes }: SupplyChainRoutesProps) => {
  if (routes.length > 0) {
    map.addSource('routes', {
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

    map.addLayer({
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

  return null;
};

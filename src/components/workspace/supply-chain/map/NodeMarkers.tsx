
import mapboxgl from 'mapbox-gl';
import type { SupplyChainNode } from '../types';

interface NodeMarkersProps {
  map: mapboxgl.Map;
  nodes: SupplyChainNode[];
  onNodeSelect: (node: SupplyChainNode) => void;
}

export const NodeMarkers = ({ map, nodes, onNodeSelect }: NodeMarkersProps) => {
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
      .addTo(map);

    marker.getElement().addEventListener('click', () => {
      onNodeSelect(node);
    });
  });

  return null;
};

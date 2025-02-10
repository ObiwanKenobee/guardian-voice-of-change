
export interface SupplyChainNode {
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

export interface SupplyChainRoute {
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

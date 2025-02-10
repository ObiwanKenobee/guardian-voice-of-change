
import { Database } from '../_shared/database.types'

export interface SupplyChainNode {
  name: string;
  location_type: string;
  latitude: number;
  longitude: number;
  status?: string;
  metadata?: Record<string, any>;
}

export interface SupplyChainRoute {
  origin_id: string;
  destination_id: string;
  route_type: string;
  status?: string;
  metadata?: Record<string, any>;
}

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

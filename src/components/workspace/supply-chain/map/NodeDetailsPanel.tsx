
import { Badge } from "@/components/ui/badge";
import type { SupplyChainNode } from '../types';

interface NodeDetailsPanelProps {
  node: SupplyChainNode;
  onClose: () => void;
}

export const NodeDetailsPanel = ({ node, onClose }: NodeDetailsPanelProps) => {
  return (
    <div className="absolute top-4 right-4 w-full max-w-[280px] sm:max-w-sm bg-background/95 p-4 rounded-lg shadow-lg">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold truncate">{node.name}</h3>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground ml-2 flex-shrink-0"
        >
          ×
        </button>
      </div>
      <div className="mt-2 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Facility Type:</span>
          <Badge variant="outline" className="ml-2">{node.facility_type}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status:</span>
          <Badge className="ml-2">{node.status}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Inventory:</span>
          <span className="ml-2">{node.inventory_level}/{node.capacity}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Risk Score:</span>
          <Badge variant={node.risk_score > 7 ? "destructive" : "default"} className="ml-2">
            {node.risk_score}
          </Badge>
        </div>
      </div>
    </div>
  );
};

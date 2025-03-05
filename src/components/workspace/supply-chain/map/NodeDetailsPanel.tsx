
import { Badge } from "@/components/ui/badge";
import type { SupplyChainNode } from '../types';
import { useIsMobile } from "@/hooks/use-mobile";

interface NodeDetailsPanelProps {
  node: SupplyChainNode;
  onClose: () => void;
}

export const NodeDetailsPanel = ({ node, onClose }: NodeDetailsPanelProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-full max-w-[240px] sm:max-w-[280px] md:max-w-sm bg-background/95 p-2 sm:p-4 rounded-lg shadow-lg">
      <div className="flex items-start justify-between">
        <h3 className="text-sm sm:text-lg font-semibold truncate">{node.name}</h3>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground ml-2 flex-shrink-0 text-lg sm:text-xl"
        >
          ×
        </button>
      </div>
      <div className="mt-1 sm:mt-2 space-y-1 sm:space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm text-muted-foreground">Facility Type:</span>
          <Badge variant="outline" className="ml-2 text-[10px] sm:text-xs">{node.facility_type}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm text-muted-foreground">Status:</span>
          <Badge className="ml-2 text-[10px] sm:text-xs">{node.status}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm text-muted-foreground">Inventory:</span>
          <span className="ml-2 text-xs sm:text-sm">{node.inventory_level}/{node.capacity}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm text-muted-foreground">Risk Score:</span>
          <Badge variant={node.risk_score > 7 ? "destructive" : "default"} className="ml-2 text-[10px] sm:text-xs">
            {node.risk_score}
          </Badge>
        </div>
      </div>
    </div>
  );
};

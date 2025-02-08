
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, Edit2 } from "lucide-react";
import { toast } from "sonner";

interface RegionComplianceTableProps {
  data: any[];
  isLoading: boolean;
  onDelete?: (id: string) => void;
  onUpdate?: (id: string, updates: any) => void;
}

export const RegionComplianceTable = ({ 
  data, 
  isLoading,
  onDelete,
  onUpdate 
}: RegionComplianceTableProps) => {
  if (isLoading) {
    return <div>Loading compliance data...</div>;
  }

  const handleDelete = (id: string) => {
    if (onDelete) {
      if (window.confirm('Are you sure you want to delete this rule?')) {
        onDelete(id);
      }
    }
  };

  const handleStatusToggle = (id: string, currentStatus: string) => {
    if (onUpdate) {
      const newStatus = currentStatus === 'compliant' ? 'non_compliant' : 'compliant';
      onUpdate(id, { status: newStatus });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Region</TableHead>
          <TableHead>Framework</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((rule) => (
          <TableRow key={rule.id}>
            <TableCell>{rule.name}</TableCell>
            <TableCell>{rule.framework}</TableCell>
            <TableCell>
              <Badge
                variant={rule.status === 'compliant' ? 'success' : 'destructive'}
                className="cursor-pointer"
                onClick={() => handleStatusToggle(rule.id, rule.status)}
              >
                {rule.status}
              </Badge>
            </TableCell>
            <TableCell>
              {new Date(rule.updated_at).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDelete(rule.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

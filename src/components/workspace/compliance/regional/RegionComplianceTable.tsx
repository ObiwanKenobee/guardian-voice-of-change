import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface RegionComplianceTableProps {
  data: any[];
  isLoading: boolean;
}

export const RegionComplianceTable = ({ data, isLoading }: RegionComplianceTableProps) => {
  if (isLoading) {
    return <div>Loading compliance data...</div>;
  }

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
              >
                {rule.status}
              </Badge>
            </TableCell>
            <TableCell>
              {new Date(rule.updated_at).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";

const policies = [
  {
    id: 1,
    name: "Board Meeting Protocol",
    category: "Board Governance",
    lastUpdated: "2024-02-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Code of Ethics",
    category: "Ethics & Compliance",
    lastUpdated: "2024-01-20",
    status: "Under Review",
  },
  {
    id: 3,
    name: "Risk Management Framework",
    category: "Risk Management",
    lastUpdated: "2024-02-01",
    status: "Active",
  },
  {
    id: 4,
    name: "Sustainability Policy",
    category: "ESG",
    lastUpdated: "2024-02-10",
    status: "Active",
  },
  {
    id: 5,
    name: "Data Protection Policy",
    category: "Information Security",
    lastUpdated: "2024-02-20",
    status: "Active",
  },
];

export const PolicyList = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Corporate Policies</h2>
          <p className="text-muted-foreground">
            View and manage organizational policies and procedures
          </p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          New Policy
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Policy Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {policies.map((policy) => (
              <TableRow key={policy.id}>
                <TableCell className="font-medium">{policy.name}</TableCell>
                <TableCell>{policy.category}</TableCell>
                <TableCell>{policy.lastUpdated}</TableCell>
                <TableCell>
                  <Badge
                    variant={policy.status === "Active" ? "default" : "secondary"}
                  >
                    {policy.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
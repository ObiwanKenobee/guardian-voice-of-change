import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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
];

export const PolicyList = () => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Policy Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Status</TableHead>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
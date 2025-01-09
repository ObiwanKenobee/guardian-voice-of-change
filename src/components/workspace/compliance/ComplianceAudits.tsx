import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockAudits = [
  {
    id: 1,
    name: "Internal Environmental Audit",
    date: "2024-03-15",
    auditor: "John Smith",
    status: "Completed",
    findings: 2,
  },
  {
    id: 2,
    name: "ISO 14001 Certification",
    date: "2024-04-01",
    auditor: "External Corp",
    status: "Scheduled",
    findings: 0,
  },
  {
    id: 3,
    name: "Waste Management Review",
    date: "2024-02-28",
    auditor: "Sarah Johnson",
    status: "In Progress",
    findings: 3,
  },
];

export const ComplianceAudits = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5" />
          Audit History
        </CardTitle>
        <Button variant="outline" size="sm">
          Schedule Audit
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Audit Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Auditor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Findings</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAudits.map((audit) => (
              <TableRow key={audit.id}>
                <TableCell>{audit.name}</TableCell>
                <TableCell>{audit.date}</TableCell>
                <TableCell>{audit.auditor}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      audit.status === "Completed"
                        ? "success"
                        : audit.status === "In Progress"
                        ? "warning"
                        : "default"
                    }
                  >
                    {audit.status}
                  </Badge>
                </TableCell>
                <TableCell>{audit.findings}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
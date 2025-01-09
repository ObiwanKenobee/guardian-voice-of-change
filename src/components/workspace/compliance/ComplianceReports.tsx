import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockReports = [
  {
    id: 1,
    title: "Q1 Environmental Report",
    date: "2024-03-31",
    status: "Completed",
    type: "Quarterly",
  },
  {
    id: 2,
    title: "Annual Sustainability Review",
    date: "2024-02-15",
    status: "In Progress",
    type: "Annual",
  },
  {
    id: 3,
    title: "Carbon Emissions Assessment",
    date: "2024-01-30",
    status: "Completed",
    type: "Special",
  },
];

export const ComplianceReports = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Compliance Reports
        </CardTitle>
        <Button variant="outline" size="sm">
          <FileText className="mr-2 h-4 w-4" />
          New Report
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.title}</TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>
                  <Badge variant={report.status === "Completed" ? "success" : "warning"}>
                    {report.status}
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
      </CardContent>
    </Card>
  );
};
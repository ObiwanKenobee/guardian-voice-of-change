import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const mockPatrols = [
  {
    id: 1,
    date: "2024-03-15",
    team: "Team Alpha",
    area: "North Sector",
    duration: "4h 30m",
    findings: "Spotted 3 elephants, signs of recent poaching activity",
    status: "completed"
  },
  {
    id: 2,
    date: "2024-03-14",
    team: "Team Beta",
    area: "East Sector",
    duration: "5h 15m",
    findings: "Found new wildlife corridor, installed 2 camera traps",
    status: "completed"
  },
  {
    id: 3,
    date: "2024-03-16",
    team: "Team Gamma",
    area: "South Sector",
    duration: "3h 45m",
    findings: "Maintenance of water sources, tracks of endangered species",
    status: "in-progress"
  }
];

export const PatrolReports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredPatrols = mockPatrols.filter(patrol => 
    patrol.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patrol.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patrol.findings.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patrols..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Filter by Date
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredPatrols.map((patrol) => (
          <Card key={patrol.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg">{patrol.area}</CardTitle>
                <CardDescription>{patrol.date}</CardDescription>
              </div>
              <Badge variant={patrol.status === 'completed' ? 'default' : 'secondary'}>
                {patrol.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{patrol.team}</span>
                  <span className="text-muted-foreground">•</span>
                  <span>{patrol.duration}</span>
                </div>
                <p className="text-muted-foreground">{patrol.findings}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
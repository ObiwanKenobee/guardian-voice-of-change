import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Map, Clock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockAlerts = [
  {
    id: 1,
    timestamp: "2024-03-15T10:30:00",
    type: "Camera Malfunction",
    location: "Camera #12 - North Ridge",
    priority: "high",
    status: "open",
    description: "Battery level critical, maintenance required"
  },
  {
    id: 2,
    timestamp: "2024-03-15T09:15:00",
    type: "Unusual Activity",
    location: "South Border - Zone B",
    priority: "medium",
    status: "investigating",
    description: "Multiple thermal triggers in restricted area"
  },
  {
    id: 3,
    timestamp: "2024-03-14T18:45:00",
    type: "Species Alert",
    location: "Camera #08 - Water Hole",
    priority: "low",
    status: "resolved",
    description: "First sighting of rare species in 6 months"
  }
];

export const AlertsDashboard = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-destructive';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return '';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="destructive">Open</Badge>;
      case 'investigating':
        return <Badge variant="secondary">Investigating</Badge>;
      case 'resolved':
        return <Badge variant="default">Resolved</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 high priority</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45m</div>
            <p className="text-xs text-muted-foreground">Average this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        {mockAlerts.map((alert) => (
          <Card key={alert.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg">{alert.type}</CardTitle>
                <CardDescription>{new Date(alert.timestamp).toLocaleString()}</CardDescription>
              </div>
              {getStatusBadge(alert.status)}
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <Map className="h-4 w-4 text-muted-foreground" />
                  <span>{alert.location}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className={getPriorityColor(alert.priority)}>
                    {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)} Priority
                  </span>
                </div>
                <p className="text-muted-foreground">{alert.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
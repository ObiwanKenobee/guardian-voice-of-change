import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Camera, Map, AlertTriangle, Calendar, Users, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const mockData = [
  { date: '2024-01', sightings: 45 },
  { date: '2024-02', sightings: 52 },
  { date: '2024-03', sightings: 48 },
  { date: '2024-04', sightings: 61 },
  { date: '2024-05', sightings: 55 },
];

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

const CameraTraps = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Cameras</CardTitle>
          <Camera className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-muted-foreground">4 requiring maintenance</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Coverage Area</CardTitle>
          <Map className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,250 ha</div>
          <p className="text-xs text-muted-foreground">85% of target area</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Alerts</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-muted-foreground">2 high priority</p>
        </CardContent>
      </Card>
    </div>

    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Wildlife Sightings Trend</CardTitle>
        <CardDescription>Monthly wildlife activity captured by camera traps</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sightings" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  </div>
);

const PatrolReports = () => {
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

const AlertsDashboard = () => {
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

export const WildlifeMonitoring = () => {
  const [activeTab, setActiveTab] = useState("camera-traps");
  const { toast } = useToast();

  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ['wildlife-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('analytics_metrics')
        .select('*')
        .eq('metric_type', 'wildlife')
        .order('timestamp', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    },
  });

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your report is being generated and will download shortly.",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Wildlife Monitoring</CardTitle>
          <CardDescription>Track and analyze wildlife activity in protected areas</CardDescription>
        </div>
        <Button onClick={handleExport} variant="outline">Export Data</Button>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="camera-traps">Camera Traps</TabsTrigger>
            <TabsTrigger value="patrols">Patrol Reports</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="camera-traps">
            <CameraTraps />
          </TabsContent>
          
          <TabsContent value="patrols">
            <PatrolReports />
          </TabsContent>
          
          <TabsContent value="alerts">
            <AlertsDashboard />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

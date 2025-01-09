import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, Users, Target, Calendar } from "lucide-react";

const ProjectCard = ({ project }: { project: any }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg">{project.title}</CardTitle>
        <Badge variant={project.status === "active" ? "default" : "secondary"}>
          {project.status}
        </Badge>
      </div>
      <CardDescription>{project.description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{project.progress}%</span>
        </div>
        <Progress value={project.progress} className="h-2" />
        
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{project.team} members</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{project.species} species</span>
          </div>
          <div className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{project.area} hectares</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{project.duration}</span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const mockProjects = [
  {
    id: 1,
    title: "Tiger Habitat Restoration",
    description: "Restoring natural tiger habitat in protected areas",
    status: "active",
    progress: 75,
    team: 12,
    species: 4,
    area: 500,
    duration: "18 months"
  },
  {
    id: 2,
    title: "Elephant Migration Corridor",
    description: "Establishing safe passage for elephant herds",
    status: "active",
    progress: 45,
    team: 8,
    species: 2,
    area: 1200,
    duration: "24 months"
  },
  {
    id: 3,
    title: "Wetland Conservation",
    description: "Protecting critical wetland ecosystems",
    status: "planning",
    progress: 15,
    team: 6,
    species: 12,
    area: 300,
    duration: "12 months"
  }
];

export const ConservationProjects = () => {
  const [filter, setFilter] = useState("all");

  const { data: projects, isLoading } = useQuery({
    queryKey: ['conservation-projects'],
    queryFn: async () => {
      // In a real implementation, this would fetch from your Supabase database
      return mockProjects;
    },
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Conservation Projects</CardTitle>
            <CardDescription>Active conservation initiatives and their progress</CardDescription>
          </div>
          <Button variant="outline">New Project</Button>
        </div>
        <div className="flex gap-2 pt-4">
          <Button 
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button 
            variant={filter === "active" ? "default" : "outline"}
            onClick={() => setFilter("active")}
          >
            Active
          </Button>
          <Button 
            variant={filter === "planning" ? "default" : "outline"}
            onClick={() => setFilter("planning")}
          >
            Planning
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects?.filter(p => filter === "all" || p.status === filter)
            .map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </div>
      </CardContent>
    </Card>
  );
};
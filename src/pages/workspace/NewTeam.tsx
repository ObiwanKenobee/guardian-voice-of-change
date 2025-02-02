import { useState } from "react";
import { Building2, Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function NewTeam() {
  const [teamData, setTeamData] = useState({
    name: "",
    description: "",
    logo: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Team created successfully!");
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Team</CardTitle>
          <CardDescription>
            Set up a new team workspace for collaboration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Team Name</Label>
              <Input
                id="name"
                placeholder="Enter team name"
                value={teamData.name}
                onChange={(e) => setTeamData({ ...teamData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your team's purpose"
                value={teamData.description}
                onChange={(e) => setTeamData({ ...teamData, description: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">Team Logo</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setTeamData({ ...teamData, logo: file });
                    }
                  }}
                />
                {teamData.logo && (
                  <Button variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full">
              <Building2 className="mr-2 h-4 w-4" />
              Create Team
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
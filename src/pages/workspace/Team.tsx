import { useEffect, useState } from "react";
import { Users, UserPlus, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface TeamMember {
  id: string;
  full_name: string | null;
  role: string | null;
  email: string | null;
}

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    async function fetchTeamMembers() {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, role, email');
      
      if (error) {
        console.error('Error fetching team members:', error);
        return;
      }

      setTeamMembers(data || []);
    }

    fetchTeamMembers();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Team Management</h1>
          <p className="text-muted-foreground">Manage your team members and their roles</p>
        </div>
        <div className="flex gap-4">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Member
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Team Settings
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <CardContent className="flex items-center p-6">
              <Avatar className="h-12 w-12">
                <AvatarImage src={`https://avatar.vercel.sh/${member.email}`} />
                <AvatarFallback>{member.full_name?.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="ml-4 flex-1">
                <h3 className="font-semibold">{member.full_name}</h3>
                <p className="text-sm text-muted-foreground">{member.email}</p>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
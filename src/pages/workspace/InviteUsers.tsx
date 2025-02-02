import { useState } from "react";
import { Mail, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Invitation {
  email: string;
  role: string;
}

export default function InviteUsers() {
  const [invitations, setInvitations] = useState<Invitation[]>([{ email: "", role: "member" }]);

  const addInvitation = () => {
    setInvitations([...invitations, { email: "", role: "member" }]);
  };

  const removeInvitation = (index: number) => {
    setInvitations(invitations.filter((_, i) => i !== index));
  };

  const updateInvitation = (index: number, field: keyof Invitation, value: string) => {
    const newInvitations = [...invitations];
    newInvitations[index] = { ...newInvitations[index], [field]: value };
    setInvitations(newInvitations);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send invitations to your backend
    toast.success("Invitations sent successfully!");
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Invite Team Members</CardTitle>
          <CardDescription>
            Send invitations to your team members to join your workspace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {invitations.map((invitation, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={invitation.email}
                    onChange={(e) => updateInvitation(index, "email", e.target.value)}
                  />
                </div>
                <div className="w-[200px]">
                  <Select
                    value={invitation.role}
                    onValueChange={(value) => updateInvitation(index, "role", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {invitations.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeInvitation(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            
            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={addInvitation}>
                <Plus className="mr-2 h-4 w-4" />
                Add Another
              </Button>
              <Button type="submit">
                <Mail className="mr-2 h-4 w-4" />
                Send Invitations
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
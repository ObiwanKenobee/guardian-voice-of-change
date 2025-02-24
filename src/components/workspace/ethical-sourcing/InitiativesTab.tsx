
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Initiative } from "@/hooks/use-ethical-sourcing";

interface InitiativesTabProps {
  initiatives: Initiative[];
  onDelete: (id: string) => void;
  onEdit: (initiative: Initiative) => void;
  onCreate: () => void;
}

export function InitiativesTab({ initiatives, onDelete, onEdit, onCreate }: InitiativesTabProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Ethical Sourcing Initiatives</CardTitle>
          <CardDescription>Manage and track your ethical sourcing programs</CardDescription>
        </div>
        <Button onClick={onCreate}>
          <Plus className="h-4 w-4 mr-2" />
          New Initiative
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {initiatives.map((initiative) => (
            <Card key={initiative.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{initiative.title}</h3>
                  <p className="text-sm text-muted-foreground">{initiative.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={initiative.status === 'active' ? 'default' : 'secondary'}>
                    {initiative.status}
                  </Badge>
                  <Button variant="ghost" size="icon" onClick={() => onEdit(initiative)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(initiative.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

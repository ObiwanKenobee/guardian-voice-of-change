
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Initiative } from "@/hooks/use-ethical-sourcing";
import { InitiativeDialog } from "./InitiativeDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InitiativesTabProps {
  initiatives: Initiative[];
  onDelete: (id: string) => void;
  onEdit: (initiative: Initiative) => void;
  onCreate: (data: any) => void;
}

export function InitiativesTab({ initiatives, onDelete, onEdit, onCreate }: InitiativesTabProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | undefined>();

  const handleOpenDialog = (initiative?: Initiative) => {
    setSelectedInitiative(initiative);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedInitiative(undefined);
    setDialogOpen(false);
  };

  const handleSubmit = (data: any) => {
    if (selectedInitiative) {
      onEdit({ ...data, id: selectedInitiative.id });
    } else {
      onCreate(data);
    }
    handleCloseDialog();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Ethical Sourcing Initiatives</CardTitle>
          <CardDescription>Manage and track your ethical sourcing programs</CardDescription>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              New Initiative
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Create a new ethical sourcing initiative
          </TooltipContent>
        </Tooltip>
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
                  <Badge variant={initiative.status === 'in_progress' ? 'default' : 'secondary'}>
                    {initiative.status}
                  </Badge>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(initiative)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Edit initiative
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => onDelete(initiative.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Delete initiative
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              {initiative.budget && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">
                    Budget: ${initiative.budget.toLocaleString()}
                  </p>
                </div>
              )}
              {initiative.start_date && (
                <div className="mt-2 flex gap-4 text-sm text-muted-foreground">
                  <span>Start: {new Date(initiative.start_date).toLocaleDateString()}</span>
                  {initiative.end_date && (
                    <span>End: {new Date(initiative.end_date).toLocaleDateString()}</span>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      </CardContent>
      <InitiativeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        initialData={selectedInitiative}
      />
    </Card>
  );
}

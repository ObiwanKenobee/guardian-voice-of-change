import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function PolicyApprovals() {
  const { toast } = useToast();

  const { data: approvals, isLoading } = useQuery({
    queryKey: ["policy-approvals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("policy_approvals")
        .select(`
          *,
          policies (
            title,
            category,
            department
          ),
          policy_versions (
            version_number,
            content,
            created_at
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleApproval = async (id: string, approved: boolean) => {
    try {
      const { error } = await supabase
        .from("policy_approvals")
        .update({
          status: approved ? "approved" : "rejected",
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Policy ${approved ? "approved" : "rejected"} successfully.`,
      });
    } catch (error) {
      console.error("Error updating approval:", error);
      toast({
        title: "Error",
        description: "Failed to update approval status.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Policy</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Version</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : approvals?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No pending approvals
                </TableCell>
              </TableRow>
            ) : (
              approvals?.map((approval) => (
                <TableRow key={approval.id}>
                  <TableCell className="font-medium">
                    {approval.policies.title}
                  </TableCell>
                  <TableCell>{approval.policies.category}</TableCell>
                  <TableCell>{approval.policies.department}</TableCell>
                  <TableCell>
                    v{approval.policy_versions.version_number}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        approval.status === "approved"
                          ? "default"
                          : approval.status === "rejected"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {approval.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(approval.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {approval.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApproval(approval.id, true)}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleApproval(approval.id, false)}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";

export function PolicyCompliance() {
  const { data: compliance, isLoading } = useQuery({
    queryKey: ["policy-compliance"],
    queryFn: async () => {
      const { data: policies, error: policiesError } = await supabase
        .from("policies")
        .select(`
          id,
          title,
          category,
          department,
          status,
          policy_acknowledgments (
            id
          )
        `)
        .eq("status", "active");

      if (policiesError) throw policiesError;

      const { count: totalUsers } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      return policies.map((policy) => ({
        ...policy,
        acknowledgmentRate:
          (policy.policy_acknowledgments.length / (totalUsers || 1)) * 100,
      }));
    },
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Policy</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Acknowledgment Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : compliance?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No active policies found
                </TableCell>
              </TableRow>
            ) : (
              compliance?.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell className="font-medium">{policy.title}</TableCell>
                  <TableCell>{policy.category}</TableCell>
                  <TableCell>{policy.department}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={policy.acknowledgmentRate}
                        className="w-[100px]"
                      />
                      <span className="text-sm">
                        {Math.round(policy.acknowledgmentRate)}%
                      </span>
                    </div>
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

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Trash2, Edit, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type PolicyCategory = "compliance" | "security" | "hr" | "operations" | "finance" | "environmental" | "social" | "governance";

interface Policy {
  id: string;
  title: string;
  description: string;
  category: PolicyCategory;
  department: string;
  status: 'draft' | 'active' | 'archived';
  created_by: string;
  updated_at: string;
  policy_versions: {
    version_number: number;
    created_at: string;
  }[];
}

export function PolicyLibrary() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<PolicyCategory | "all">("all");
  const [department, setDepartment] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  // Fetch policies
  const { data: policies, isLoading } = useQuery({
    queryKey: ["policies", search, category, department],
    queryFn: async () => {
      let query = supabase
        .from("policies")
        .select(`
          *,
          policy_versions!inner (
            version_number,
            created_at
          )
        `)
        .order("created_at", { ascending: false });

      if (search) {
        query = query.ilike("title", `%${search}%`);
      }

      if (category && category !== "all") {
        query = query.eq("category", category);
      }

      if (department && department !== "all") {
        query = query.eq("department", department);
      }

      const { data, error } = await query;

      if (error) {
        toast.error("Error fetching policies");
        throw error;
      }
      return data as Policy[];
    },
  });

  // Delete policy mutation
  const deletePolicyMutation = useMutation({
    mutationFn: async (policyId: string) => {
      const { error } = await supabase
        .from("policies")
        .delete()
        .eq("id", policyId);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Policy deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["policies"] });
    },
    onError: (error) => {
      toast.error("Error deleting policy");
      console.error("Delete error:", error);
    },
  });

  // Update policy mutation
  const updatePolicyMutation = useMutation({
    mutationFn: async (policy: Partial<Policy> & { id: string }) => {
      const { error } = await supabase
        .from("policies")
        .update(policy)
        .eq("id", policy.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Policy updated successfully");
      queryClient.invalidateQueries({ queryKey: ["policies"] });
      setIsDialogOpen(false);
      setSelectedPolicy(null);
    },
    onError: (error) => {
      toast.error("Error updating policy");
      console.error("Update error:", error);
    },
  });

  const handleDeletePolicy = async (policyId: string) => {
    if (window.confirm("Are you sure you want to delete this policy?")) {
      deletePolicyMutation.mutate(policyId);
    }
  };

  const handleUpdatePolicy = (policy: Policy) => {
    setSelectedPolicy(policy);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search policies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={category} onValueChange={(value: PolicyCategory | "all") => setCategory(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="compliance">Compliance</SelectItem>
            <SelectItem value="security">Security</SelectItem>
            <SelectItem value="hr">HR</SelectItem>
            <SelectItem value="operations">Operations</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="environmental">Environmental</SelectItem>
            <SelectItem value="social">Social</SelectItem>
            <SelectItem value="governance">Governance</SelectItem>
          </SelectContent>
        </Select>
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="it">IT</SelectItem>
            <SelectItem value="hr">HR</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="operations">Operations</SelectItem>
            <SelectItem value="legal">Legal</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Version</TableHead>
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
            ) : policies?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No policies found
                </TableCell>
              </TableRow>
            ) : (
              policies?.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell className="font-medium">{policy.title}</TableCell>
                  <TableCell>{policy.category}</TableCell>
                  <TableCell>{policy.department}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        policy.status === "active"
                          ? "default"
                          : policy.status === "draft"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {policy.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(policy.updated_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>v{policy.policy_versions[0].version_number}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUpdatePolicy(policy)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeletePolicy(policy.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Policy</DialogTitle>
            <DialogDescription>
              Make changes to the policy details below.
            </DialogDescription>
          </DialogHeader>
          {selectedPolicy && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!selectedPolicy) return;
                updatePolicyMutation.mutate(selectedPolicy);
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={selectedPolicy.title}
                  onChange={(e) =>
                    setSelectedPolicy({
                      ...selectedPolicy,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={selectedPolicy.description}
                  onChange={(e) =>
                    setSelectedPolicy({
                      ...selectedPolicy,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={selectedPolicy.category}
                  onValueChange={(value: PolicyCategory) =>
                    setSelectedPolicy({
                      ...selectedPolicy,
                      category: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="environmental">Environmental</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="governance">Governance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={selectedPolicy.status}
                  onValueChange={(value: 'draft' | 'active' | 'archived') =>
                    setSelectedPolicy({
                      ...selectedPolicy,
                      status: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  type="button"
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

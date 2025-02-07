import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import { Search, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function PolicyLibrary() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("");
  const [department, setDepartment] = useState<string>("");

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

      if (category) {
        query = query.eq("category", category);
      }

      if (department) {
        query = query.eq("department", department);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    },
  });

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
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
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
            <SelectItem value="">All Departments</SelectItem>
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : policies?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
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
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
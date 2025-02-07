import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

type IntegrationType = "erp" | "crm" | "scm" | "hrm" | "custom";

interface FormValues {
  name: string;
  type: IntegrationType;
  config: Record<string, unknown>;
}

export const NewIntegrationDialog = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      type: "erp",
      config: {},
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!user?.id) {
      toast({
        title: "Error creating integration",
        description: "You must be logged in to create an integration",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('system_integrations')
      .insert({
        name: values.name,
        type: values.type,
        status: 'pending',
        config: values.config,
        user_id: user.id,
      });

    if (error) {
      toast({
        title: "Error creating integration",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Integration created",
        description: "New system integration has been created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['system-integrations'] });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Integration
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Integration</DialogTitle>
          <DialogDescription>
            Connect a new enterprise system to Guardian-IO
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Integration Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter integration name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>System Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select system type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="erp">ERP System</SelectItem>
                      <SelectItem value="crm">CRM System</SelectItem>
                      <SelectItem value="scm">Supply Chain Management</SelectItem>
                      <SelectItem value="hrm">HR Management</SelectItem>
                      <SelectItem value="custom">Custom System</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the type of system you want to integrate
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Integration</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
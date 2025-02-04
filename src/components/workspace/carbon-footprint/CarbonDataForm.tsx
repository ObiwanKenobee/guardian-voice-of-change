
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const carbonDataSchema = z.object({
  emission_value: z.string().min(1, "Emission value is required"),
  emission_unit: z.string().min(1, "Unit is required"),
  emission_scope: z.enum(["scope1", "scope2", "scope3"]),
  source_type: z.enum(["manual", "iot", "erp", "smart_meter"]),
  source_name: z.string().min(1, "Source name is required"),
  location: z.string().optional(),
});

type CarbonDataFormValues = z.infer<typeof carbonDataSchema>;

interface CarbonDataFormProps {
  onSuccess: () => void;
  initialData?: any;
}

export const CarbonDataForm = ({ onSuccess, initialData }: CarbonDataFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<CarbonDataFormValues>({
    resolver: zodResolver(carbonDataSchema),
    defaultValues: initialData || {
      emission_value: "",
      emission_unit: "tCO2e",
      emission_scope: "scope1",
      source_type: "manual",
      source_name: "",
      location: "",
    },
  });

  const onSubmit = async (values: CarbonDataFormValues) => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Ensure all required fields are present and correctly typed
      const insertData = {
        emission_value: parseFloat(values.emission_value),
        emission_unit: values.emission_unit,
        emission_scope: values.emission_scope,
        source_type: values.source_type,
        source_name: values.source_name,
        location: values.location || null,
        user_id: user.id,
      };

      const operation = initialData
        ? supabase
            .from("carbon_footprint_data")
            .update(insertData)
            .eq("id", initialData.id)
        : supabase
            .from("carbon_footprint_data")
            .insert(insertData);

      const { error } = await operation;
      if (error) throw error;

      toast({
        title: "Success",
        description: `Carbon data ${initialData ? "updated" : "created"} successfully`,
      });
      onSuccess();
      form.reset();
    } catch (error: any) {
      console.error("Error saving carbon data:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save carbon data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="emission_value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emission Value</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="Enter emission value" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emission_unit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit</FormLabel>
              <FormControl>
                <Input placeholder="e.g., tCO2e" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emission_scope"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Emission Scope</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select emission scope" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="scope1">Scope 1 (Direct)</SelectItem>
                  <SelectItem value="scope2">Scope 2 (Indirect - Energy)</SelectItem>
                  <SelectItem value="scope3">Scope 3 (Indirect - Other)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="source_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="manual">Manual Entry</SelectItem>
                  <SelectItem value="iot">IoT Sensor</SelectItem>
                  <SelectItem value="erp">ERP System</SelectItem>
                  <SelectItem value="smart_meter">Smart Meter</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="source_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter source name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {initialData ? "Updating..." : "Creating..."}
            </>
          ) : (
            initialData ? "Update Entry" : "Create Entry"
          )}
        </Button>
      </form>
    </Form>
  );
};

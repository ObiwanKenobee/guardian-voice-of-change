import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

const metricSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional(),
  metric_type: z.enum(["wildlife", "supply_chain", "sensor", "collaboration"]),
  visualization_type: z.enum(["bar", "line", "pie", "heatmap", "radar", "area", "gauge"]),
  data_source: z.string().min(1, "Data source is required"),
});

type MetricFormValues = z.infer<typeof metricSchema>;

interface MetricFormProps {
  onSuccess: () => void;
  initialData?: any;
}

export const MetricForm = ({ onSuccess, initialData }: MetricFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<MetricFormValues>({
    resolver: zodResolver(metricSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      metric_type: "wildlife",
      visualization_type: "bar",
      data_source: "",
    },
  });

  const onSubmit = async (values: MetricFormValues) => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const operation = initialData 
        ? supabase.from("custom_metrics").update({ 
            ...values, 
            updated_at: new Date().toISOString() 
          }).eq("id", initialData.id)
        : supabase.from("custom_metrics").insert({ 
            ...values, 
            user_id: user.id 
          });

      const { error } = await operation;
      if (error) throw error;

      toast({
        title: "Success",
        description: `Metric ${initialData ? "updated" : "created"} successfully`,
      });
      onSuccess();
      form.reset();
    } catch (error: any) {
      console.error("Error saving metric:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save metric. Please try again.",
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Metric Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter metric name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter metric description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="metric_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Metric Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select metric type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="wildlife">Wildlife</SelectItem>
                  <SelectItem value="supply_chain">Supply Chain</SelectItem>
                  <SelectItem value="sensor">Sensor</SelectItem>
                  <SelectItem value="collaboration">Collaboration</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="visualization_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visualization Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select visualization type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                  <SelectItem value="heatmap">Heatmap</SelectItem>
                  <SelectItem value="radar">Radar Chart</SelectItem>
                  <SelectItem value="area">Area Chart</SelectItem>
                  <SelectItem value="gauge">Gauge</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="data_source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data Source</FormLabel>
              <FormControl>
                <Input placeholder="Enter data source" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {initialData ? "Updating..." : "Creating..."}
            </>
          ) : (
            initialData ? "Update Metric" : "Create Metric"
          )}
        </Button>
      </form>
    </Form>
  );
};
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface RiskAssessmentFormProps {
  initialData?: {
    id: string;
    title: string;
    description: string;
    risk_level: string;
    impact_score: number;
    probability_score: number;
    mitigation_plan: string;
    category: string;
    due_date?: string;
  } | null;
  onSuccess: () => void;
}

interface FormValues {
  title: string;
  description: string;
  risk_level: string;
  impact_score: string;
  probability_score: string;
  mitigation_plan: string;
  category: string;
  due_date?: string;
}

export const RiskAssessmentForm = ({ initialData, onSuccess }: RiskAssessmentFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    defaultValues: initialData ? {
      ...initialData,
      impact_score: initialData.impact_score.toString(),
      probability_score: initialData.probability_score.toString(),
    } : {
      title: "",
      description: "",
      risk_level: "low",
      impact_score: "1",
      probability_score: "1",
      mitigation_plan: "",
      category: "operational",
    }
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const data = {
        ...values,
        impact_score: parseInt(values.impact_score),
        probability_score: parseInt(values.probability_score),
      };

      if (initialData) {
        const { error } = await supabase
          .from('risk_assessments')
          .update(data)
          .eq('id', initialData.id);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Risk assessment updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('risk_assessments')
          .insert([data]);
        
        if (error) throw error;
        toast({
          title: "Success",
          description: "Risk assessment created successfully",
        });
      }
      
      onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="risk_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Risk Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="operational">Operational</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="strategic">Strategic</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="environmental">Environmental</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="impact_score"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Impact Score (1-5)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select impact score" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((score) => (
                      <SelectItem key={score} value={score.toString()}>
                        {score}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="probability_score"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Probability Score (1-5)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select probability score" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((score) => (
                      <SelectItem key={score} value={score.toString()}>
                        {score}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="mitigation_plan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mitigation Plan</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={isLoading}>
            {initialData ? "Update" : "Create"} Risk Assessment
          </Button>
        </div>
      </form>
    </Form>
  );
};
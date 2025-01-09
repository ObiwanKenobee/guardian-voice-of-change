import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  framework: z.string().min(1, {
    message: "Please select a framework.",
  }),
  description: z.string().optional(),
  rule_type: z.string().min(1, {
    message: "Please select a rule type.",
  }),
  frequency: z.string().min(1, {
    message: "Please select a frequency.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function ComplianceRuleForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      framework: "",
      description: "",
      rule_type: "",
      frequency: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        toast({
          title: "Error",
          description: "You must be logged in to create automation rules.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("compliance_automation_rules").insert({
        name: values.name,
        framework: values.framework,
        description: values.description,
        rule_type: values.rule_type,
        frequency: values.frequency,
        user_id: userData.user.id,
      });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create automation rule.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Automation rule created successfully.",
      });
      form.reset();
    } catch (error) {
      console.error("Error creating automation rule:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rule Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter rule name" {...field} />
              </FormControl>
              <FormDescription>
                Give your automation rule a descriptive name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="framework"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Compliance Framework</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a framework" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="iso27001">ISO 27001</SelectItem>
                  <SelectItem value="gdpr">GDPR</SelectItem>
                  <SelectItem value="hipaa">HIPAA</SelectItem>
                  <SelectItem value="sox">SOX</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the compliance framework this rule applies to.
              </FormDescription>
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
                <Textarea
                  placeholder="Describe the purpose of this automation rule"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rule_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rule Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a rule type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="monitoring">Monitoring</SelectItem>
                  <SelectItem value="reporting">Reporting</SelectItem>
                  <SelectItem value="alert">Alert</SelectItem>
                  <SelectItem value="remediation">Remediation</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the type of automation rule.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frequency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                How often should this rule be executed?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create Automation Rule</Button>
      </form>
    </Form>
  );
}
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { SignInValues } from "./types";
import { Link } from "react-router-dom";

interface SignInFormFieldsProps {
  form: UseFormReturn<SignInValues>;
}

export const SignInFormFields = ({ form }: SignInFormFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Enter your email"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="Enter your password"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex justify-end">
        <Link
          to="/forgot-password"
          className="text-sm text-primary hover:underline"
        >
          Forgot password?
        </Link>
      </div>
    </>
  );
};

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { SignInValues } from "./types";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { EmailValidationResult } from "@/utils/emailValidation";

interface SignInFormFieldsProps {
  form: UseFormReturn<SignInValues>;
  onEmailBlur?: (email: string) => void;
  isValidatingEmail?: boolean;
  emailValidationResult?: EmailValidationResult | null;
}

export const SignInFormFields = ({ 
  form, 
  onEmailBlur,
  isValidatingEmail,
  emailValidationResult 
}: SignInFormFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <div className="relative">
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...field}
                  onBlur={(e) => {
                    field.onBlur();
                    onEmailBlur?.(e.target.value);
                  }}
                />
              </FormControl>
              {isValidatingEmail && (
                <div className="absolute right-3 top-2.5">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
              )}
            </div>
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

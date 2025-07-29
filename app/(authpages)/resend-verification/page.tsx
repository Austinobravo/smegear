"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const resendVerificationSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export default function ResendVerificationPage() {

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof resendVerificationSchema>>({
    resolver: zodResolver(resendVerificationSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof resendVerificationSchema>) => {
    setLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/resend-verification`, {
        email: values.email,
      });

      toast.success("A new verification link has been sent to your email.");
    } catch (error: any) {
      error?.response?.data?.message || "Something went wrong."
      toast.error(`${error?.response?.data?.message || "Something went wrong."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">Resend Verification Email</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Verification Email"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";


const schema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgottenPasswordInput = z.infer<typeof schema>;

const ForgottenPassword = () => {
  const [message, setMessage] = useState("");
  const form = useForm<ForgottenPasswordInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ForgottenPasswordInput) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
        data
      );
      console.log(response.data);
      toast.success("Reset link sent! Please check your email.");
    } catch (error) {
      console.log(error)
      toast.error("Failed to send reset link.");
      console.error(error);
    }
  };
  return (
    <section className="space-y-5 mb-5 flex flex-col items-center justify-center my-10">

      <h1 className="text-3xl font-bold">Forgot Password</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto mt-6">
        <Input
          {...form.register("email")}
          type="email"
          placeholder="Enter your email"
          className="text-lg p-6"
        />
        {form.formState.errors.email && (
          <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
        )}
        <Button type="submit" className="w-full text-lg py-6 bg-smegear-secondary hover:bg-smegear-accent">
          Send Reset Link
        </Button>
        {message && <p className="text-green-600 text-sm">{message}</p>}
      </form>
    </section>
  );
};

export default ForgottenPassword;

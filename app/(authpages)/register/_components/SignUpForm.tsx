"use client";

import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import axios from "axios";
import { register } from "module";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    userName: z.string().min(1, "User name is required"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function RegistrationForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const isSubmitting = form.formState.isSubmitting
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      username: values.userName,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        payload
      );

      // ✅ Log full response for inspection
      console.log("✅ API Response:", response);
      console.log("🔁 Response Data:", response.data);
      console.log("📦 Status Code:", response.status);

      if (response.status === 201) {
        toast.success("Registration successful", {
          description: response.data.message,
        });
        router.push("/student");
      }

      form.reset();
    } catch (error: any) {
      // Safely extract error message
      let errorMessage = "Something went wrong. Please try again.";

      if (error?.response?.data) {
        const rawMessage =
          error.response.data.error || error.response.data.message;

        errorMessage =
          typeof rawMessage === "string"
            ? rawMessage
            : JSON.stringify(rawMessage);

        // ✅ Log error response for debugging
        console.error("API Error Response:", error.response.data);
      } else if (typeof error === "string") {
        errorMessage = error;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      toast.error("Error", {
        description: errorMessage,
      });
    }
  };

  return (
    <div className="w-full px-4 md:px-12 py-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="User Name"
                    className="h-14 text-lg border-2"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="First Name"
                    className="h-14 text-lg border-2"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Last Name"
                    className="h-14 text-lg border-2"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    placeholder="E-Mail"
                    className="h-14 text-lg border-2"
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                      placeholder="Password"
                      className="h-14 text-lg border-2 pr-12"
                    />
                  </FormControl>
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      {...field}
                      placeholder="Password Confirmation"
                      className="h-14 text-lg border-2 pr-12"
                    />
                  </FormControl>
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />


          <div className="col-span-1 md:col-span-2">
            <Button className="px-10 py-6 bg-smegear-secondary text-white font-semibold uppercase flex items-center gap-2 justify-center disabled:cursor-not-allowed" disabled={isSubmitting}>
              {isSubmitting ?
                <div className="loader"></div>
                :
                <span>Register</span>
                }

            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

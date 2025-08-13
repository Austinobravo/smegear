'use client'
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { signIn, useSession } from 'next-auth/react'
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().min(1, { message: "This field is required" }),
  password: z.string().min(4, { message: "Password is required" }),
  remember: z.boolean().optional(),
})

type FormSchema = z.infer<typeof formSchema>

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const STORAGE_KEY = "rememberedUser";
  const router = useRouter()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })

  async function onSubmit(values: FormSchema) {
    console.log(values)
     try{
      const data = await signIn("credentials", 
        {
          email: values.email.trim(),
          password: values.password.trim(),
          redirect: false
        }
      )

      if (data?.error) return  toast.error("Error", {
        description: data.error,
    })

    if(data?.url){
        toast.success("Success", {
          description: "Login successful.",
      })

      if (values.remember) {
        localStorage.setItem(STORAGE_KEY, values.email.trim());
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }

      return router.push("/dashboard")

    } 



    }catch(error: any){
      toast.error("Error", {
        description: error,
    })

    }
  }

  const isSubmitting = form.formState.isSubmitting

    React.useEffect(() => {
    const savedEmail = localStorage.getItem(STORAGE_KEY)
    if(savedEmail){
      form.setValue("email", savedEmail)
      form.setValue("remember", true)
    }
  }, [])
  return (
    <div className="flex items-center justify-center min-h-[50vh] px-4 bg-white">
      <Card className="w-full max-w-md shadow-lg border-2">
        <CardContent className="py-10 space-y-10">
          <h2 className="text-xl font-semibold">Hi, Welcome back!</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Username or Email Address" {...field} className="border-2 text-lg h-14" />
                    </FormControl>
                    <FormMessage className="text-red-500" />
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
                          placeholder="Password"
                          {...field}
                          className="pr-12 border-2 text-lg h-14"
                        />
                      </FormControl>

                     
                      <div
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                        onClick={() => setShowPassword(prev => !prev)}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </div>
                    </div>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />


              
              <div className="flex items-center justify-between text-sm">
                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FormLabel htmlFor="remember" className="font-medium">
                        Keep me signed in
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <Link href="#" className="text-xs font-semibold text-smegear-accent hover:underline">
                  FORGOT PASSWORD?
                </Link>
              </div>

              
              <Button
                type="submit"
                className="w-full bg-smegear-secondary disabled:cursor-not-allowed hover:bg-smegear-accent text-white font-semibold py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ?
                <div className="loader"></div>
                :
                <span>SIGN IN</span>
                }
              </Button>

              
              <p className="text-center text-sm text-gray-600">
                Don’t have an account?{" "}
                <Link href="/register" className="font-semibold text-smegear-accent hover:underline">
                  REGISTER NOW
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
'use client'

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(5, "Message must be at least 5 characters"),
})

type ContactFormType = z.infer<typeof formSchema>

export default function ContactForm() {
  const form = useForm<ContactFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      message: "",
    },
  })

  function onSubmit(values: ContactFormType) {
    console.log(values)
  }

  return (
    <div className="flex flex-col md:flex-row w-full max-w-7xl px-4 mx-auto py-10 gap-8">
      {/* Left Column: Map */}
      <div className="w-full md:w-1/2">
        <h2 className="text-lg font-semibold mb-4 uppercase">Contact Us</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Please we will need your name"
                      className="h-14 text-base  border-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Tell us your subject?"
                      className="h-14 text-base border-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="How can we help you?"
                      className="h-36 text-base border-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-black text-white px-8 py-6 text-base font-semibold hover:bg-gray-900"
            >
              Send Us A Message
            </Button>
          </form>
        </Form>
      </div>

      {/* Right Column: Form */}
      <div className="w-full md:w-1/2">
        <iframe
          width="100%"
          height="400"
          className="rounded-md shadow-md"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=10a%20Unity%20Close%20Union%20Estate%20Oke%20Afa%20Ejigbo&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        ></iframe>

      </div>
    </div>
  )
}

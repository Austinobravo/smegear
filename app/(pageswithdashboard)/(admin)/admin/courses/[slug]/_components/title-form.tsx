"use client";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  id: z.string().min(1, "Missing course id"),
  title: z.string().min(1, "Title is required"),
});

export default function TitleForm({ category }: { category?: { id: string; title: string  } }) {
  const [isEditing, setIsEditing] = useState(false);
  const [displayTitle, setDisplayTitle] = useState(category?.title ?? "");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { id: category?.id ?? "", title: category?.title ?? "" },
    mode: "onChange",
  });

  useEffect(() => {
    if (category?.id) {
      form.reset({ id: category.id, title: category.title ?? "" });
      setDisplayTitle(category.title ?? "");
    }
  }, [category?.id, category?.title, form]);

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const prev = displayTitle;
    setDisplayTitle(values.title); // optimistic

    try {
      const res = await fetch("/api/courses", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: values.id, title: values.title }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || `Request failed: ${res.status}`);
      }
      toast.success("Title updated");
      setIsEditing(false);
    } catch (e: any) {
      setDisplayTitle(prev); // rollback
      toast.error(e.message || "Failed to update title");
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course title
        <Button onClick={() => setIsEditing((s) => !s)} variant="ghost" disabled={!category?.id}>
          {isEditing ? "Cancel" : (<><Pencil className="h-4 w-4 mr-2" />Edit title</>)}
        </Button>
      </div>

      {!isEditing && <h1 className="text-lg font-extrabold mt-1">{displayTitle || "Untitled"}</h1>}

      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <input type="hidden" {...form.register("id")} />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder="Edit Title" {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}

"use client";

import React, { useEffect, useMemo, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
interface DescriptionFormProps {
  category?:
  | {
    title?: string;
    id: string;
    description?: string;
    OverView?: string;
  }
  | undefined;
}

const formSchema = z.object({
  id: z.string().min(1, "Missing course id"),
  description: z.string().min(1, "Description is required"),
});

const DescriptionForm: React.FC<DescriptionFormProps> = ({ category }) => {
     const router = useRouter();
  // Normalize: prefer `description`, fall back to `OverView`
  const initialDescription = useMemo(
    () => category?.description ?? category?.OverView ?? "",
    [category?.description, category?.OverView]
  );

  const [isEditing, setIsEditing] = useState(false);
  const [displayDescription, setDisplayDescription] = useState(initialDescription);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: category?.id ?? "",
      description: initialDescription,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (category?.id) {
      setDisplayDescription(initialDescription);
      form.reset({ id: category.id, description: initialDescription });
    }
  }, [category?.id, initialDescription, form]);

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const prev = displayDescription;
    setDisplayDescription(values.description); // optimistic

    try {
      const res = await fetch(`/api/courses`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: values.id, description: values.description }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || `Request failed: ${res.status}`);
      }

      toast.success("Description saved!");
      setIsEditing(false);
      router.refresh();
    } catch (e: any) {
      setDisplayDescription(prev); // rollback
      toast.error(e?.message || "Failed to save description");
    }
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course description
        <Button onClick={() => setIsEditing((c) => !c)} variant="ghost" disabled={!category?.id}>
          {isEditing ? "Cancel" : (<><Pencil className="h-4 w-4 mr-2" />Edit description</>)}
        </Button>
      </div>

      {!isEditing && (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {displayDescription || "No description yet."}
        </p>
      )}

      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <input type="hidden" {...form.register("id")} />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isSubmitting}
                      placeholder="Write a short overview for this course..."
                      {...field}
                      className="bg-white min-h-32"
                    />
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
};

export default DescriptionForm;

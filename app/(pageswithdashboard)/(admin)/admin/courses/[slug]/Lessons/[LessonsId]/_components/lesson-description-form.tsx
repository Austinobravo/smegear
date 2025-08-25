"use client";

import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Editor } from "@/components/globals/editor";

// ➊ bring in Quill's default theme so read-only view looks like the editor
import "react-quill-new/dist/quill.snow.css";
// import "react-quill/dist/quill.snow.css";
// ➋ sanitize before injecting html
import DOMPurify from "isomorphic-dompurify";

interface LessonDescriptionFormProps {
  lesson: {
    id: string;
    title: string;
    content?: string | null;
    videoUrl?: string | null;
    order: number;
    moduleId: string;
    createdAt: string;
    updatedAt: string;
    module?: { id: string; title: string };
  };
}

const formSchema = z.object({
  id: z.string().min(1, "Missing course id"),
  description: z.string().min(1, "Description is required"),
});

const LessonDescriptionForm = ({ lesson }: LessonDescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((c) => !c);

  const [displayDescription, setDisplayDescription] = useState(lesson?.content ?? "");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { id: lesson?.id ?? "", description: lesson?.content ?? "" },
    mode: "onChange",
  });
  const { isSubmitting, isValid } = form.formState;

  useEffect(() => {
    if (lesson?.id) {
      form.reset({ id: lesson.id, description: lesson.content ?? "" });
      setDisplayDescription(lesson.content ?? "");
    }
  }, [lesson?.id, lesson?.content, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const prev = displayDescription;
    setDisplayDescription(values.description); // optimistic

    try {
      const res = await fetch("/api/lessons", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: values.id, content: values.description }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || `Request failed: ${res.status}`);
      }
      toast.success("Description updated");
      setIsEditing(false);
    } catch (e: any) {
      setDisplayDescription(prev); // rollback
      toast.error(e.message || "Failed to update description");
    }
  }

  const sanitized = DOMPurify.sanitize(displayDescription || "");

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Lesson description
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? "Cancel" : (<><Pencil className="h-4 w-4 mr-2" />Edit description</>)}
        </Button>
      </div>

      {/* READ-ONLY VIEW */}
      {!isEditing && (
        <>
          {!sanitized ? (
            <p className="text-sm mt-2 text-slate-500 italic">No description</p>
          ) : (
            // Give it ql-editor so Quill's CSS styles the content
            <div
              className={cn("mt-2 ql-editor")}
              dangerouslySetInnerHTML={{ __html: sanitized }}
            />
          )}
        </>
      )}

      {/* EDITOR VIEW */}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Editor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Save
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default LessonDescriptionForm;

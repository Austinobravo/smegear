"use client";

import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface LessonTitleFormProps {
  lesson: {
    id: string;
    title: string;
    content?: string | null;
    videoUrl?: string | null;
    order: number;
    moduleId: string;
    createdAt: string;
    updatedAt: string;
    module?: {
      id: string;
      title: string;
    };
  };
}
const formSchema = z.object({
  id: z.string().min(1, "Missing course id"),
  title: z.string().min(1, "Title is required"),
});
const LessonTitleForm = ({ lesson }: LessonTitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const [displayTitle, setDisplayTitle] = useState(lesson?.title ?? "");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { id: lesson?.id ?? "", title: lesson?.title ?? "" },
    mode: "onChange",
  });

  useEffect(() => {
    if (lesson?.id) {
      form.reset({ id: lesson.id, title: lesson.title ?? "" });
      setDisplayTitle(lesson.title ?? "");
    }
  }, [lesson?.id, lesson?.title, form]);

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const prev = displayTitle;
    setDisplayTitle(values.title); // optimistic

    try {
      const res = await fetch("/api/lessons", {
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
        {/* Display the lesson title from the object */}
        Lesson title
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>

      {!isEditing && <p className="text-md font-extrabold mt-1">{displayTitle}</p>}

      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder={`e.g. "Introduction to the course"`}
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              {isSubmitting ? (
                <span className="flex items-center justify-center min-w-[3.5rem]">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                </span>
              ) : (
                <span className="min-w-[3.5rem] text-center">Save</span>
              )}

            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default LessonTitleForm;

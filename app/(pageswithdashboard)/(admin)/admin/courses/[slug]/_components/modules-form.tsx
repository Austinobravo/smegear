"use client";
import React, { useEffect, useMemo, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ChaptersList from "./modules-list";

interface ChaptersFormProps {
  category:
    | {
        Title: string;
        OverView: string;
        id: string; // courseId
        modules?: {
          id: number;
          ModuleTitle: string;
          name: string;
          lessons: { id: string; title: string }[];
        }[];
        isPublished: boolean;
        free: boolean;
        price: number;
      }
    | undefined;
}

// API module shape (from your backend)
type ApiModule = {
  id: string;
  title: string;
  order: number;
  courseId: string;
};

const ChaptersForm: React.FC<ChaptersFormProps> = ({ category }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiModules, setApiModules] = useState<ApiModule[]>([]);
  const toggleCreating = () => setIsCreating((c) => !c);

  const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" },
  });
  const { isSubmitting, isValid } = form.formState;

  // fetch modules for this course
  const fetchModules = async () => {
    if (!category?.id) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/modules?courseId=${category.id}`);
      if (!res.ok) throw new Error("Failed to load modules");
      const data: ApiModule[] = await res.json();
      setApiModules(data);
    } catch (e: any) {
      toast.error(e?.message ?? "Could not load modules");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category?.id]);

  const modulesLength = apiModules.length; // use live data

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!category?.id) {
      toast.error("Missing course id.");
      return;
    }
    try {
      const res = await fetch("/api/modules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: values.title,
          courseId: category.id,
          order: modulesLength + 1, // append to end
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "Failed to create module");
      }

      toast.success("Module created");
      form.reset({ title: "" });
      setIsCreating(false);
      await fetchModules(); // refresh the list
    } catch (e: any) {
      toast.error(e?.message ?? "Something went wrong");
    }
  };

  // Map API modules to the shape your ChaptersList expects
  const categoryForList = useMemo(() => {
    if (!category) return undefined;
    const mapped = apiModules
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((m) => ({
        id: (m.id as unknown) as number, // keep your downstream types happy
        ModuleTitle: m.title,
        name: m.title,
        lessons: [] as { id: string; title: string }[],
      }));
    return { ...category, modules: mapped };
  }, [category, apiModules]);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course modules
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? "Cancel" : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" /> Add a module
            </>
          )}
        </Button>
      </div>

      {isCreating && (
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
                      placeholder="e.g. Introduction to the course"
                      {...field}
                      className="bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </form>
        </Form>
      )}

      {!isCreating && (
        <div className={cn("text-sm mt-2", apiModules.length === 0 && "text-slate-500 italic")}>
          {loading && "Loading modules..."}
          {!loading && modulesLength === 0 && "No chapters"}
          {/* Render using your existing list component */}
          {categoryForList && <ChaptersList category={categoryForList} />}
        </div>
      )}

      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  );
};

export default ChaptersForm;

"use client";

import React, { useEffect, useMemo, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form, FormControl, FormField, FormItem, FormMessage,
} from "@/components/ui/form";
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
          id: number; // incoming SSR can be number — that's ok, we normalize later
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

type ApiModule = {
  id: string;
  title: string;
  order: number;
  courseId: string;
};

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

const mapCategoryModulesToApi = (
  courseId?: string,
  modules?: { id: number; ModuleTitle: string }[]
): ApiModule[] => {
  if (!courseId || !modules) return [];
  return modules.map((m, idx) => ({
    id: String(m.id ?? idx + 1), // normalize to string here
    title: m.ModuleTitle,
    order: idx + 1,
    courseId,
  }));
};

const ChaptersForm: React.FC<ChaptersFormProps> = ({ category }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  // Seed from SSR data so it shows on first paint
  const [apiModules, setApiModules] = useState<ApiModule[]>(
    () => mapCategoryModulesToApi(category?.id, category?.modules)
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "" },
  });
  const { isSubmitting, isValid } = form.formState;

  const fetchModules = async (retries = 3, delayMs = 400) => {
    if (!category?.id) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/modules?courseId=${category.id}`, {
        credentials: "include",
        cache: "no-store",
        headers: { "cache-control": "no-cache", pragma: "no-cache" },
      });

      if (!res.ok) {
        if ((res.status === 401 || res.status === 403 || res.status >= 500) && retries > 0) {
          await new Promise((r) => setTimeout(r, delayMs));
          return fetchModules(retries - 1, delayMs * 1.5);
        }
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || `Failed to load modules (${res.status})`);
      }

      const data: ApiModule[] = await res.json();
      setApiModules(Array.isArray(data) ? data : []);
    } catch (e: any) {
      toast.error(e?.message ?? "Could not load modules");
    } finally {
      setLoading(false);
    }
  };

  // Load (and refresh) on course change
  useEffect(() => {
    // Re-seed when course changes (helps if SSR passed new category)
    setApiModules(mapCategoryModulesToApi(category?.id, category?.modules));
    // Then reconcile with API
    fetchModules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category?.id]);

  // Revalidate on focus/visibility
  useEffect(() => {
    const onFocus = () => fetchModules();
    const onVisibility = () => {
      if (document.visibilityState === "visible") fetchModules();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category?.id]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!category?.id) {
      toast.error("Missing course id.");
      return;
    }

    try {
      const res = await fetch("/api/modules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        cache: "no-store",
        body: JSON.stringify({
          title: values.title,
          courseId: category.id,
          order: apiModules.length + 1,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "Failed to create module");
      }

      const newModule: ApiModule = await res.json();

      // Optimistic update so it shows instantly
      setApiModules((prev) => [...prev, newModule]);

      toast.success("Module created");
      form.reset({ title: "" });
      setIsCreating(false);

      // Re-fetch to confirm order/data with DB
      fetchModules();
    } catch (e: any) {
      toast.error(e?.message ?? "Something went wrong");
    }
  };

  // ----------- FIX IS HERE: ensure module id is a STRING for ChaptersList -----------
  const categoryForList = useMemo(() => {
    if (!category) return undefined;
    const mapped = apiModules
      .slice()
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((m, idx) => ({
        id: String(m.id ?? idx + 1), // <-- force string, not number
        ModuleTitle: m.title,
        name: m.title,
        lessons: [] as { id: string; title: string }[],
      }));
    // Keep only the fields ChaptersList cares about; extra fields are fine, but this keeps it clean
    return {
      Title: category.Title,
      id: category.id,
      OverView: category.OverView,
      modules: mapped, // <-- now Module[] with id: string
      isPublished: category.isPublished,
      free: category.free,
    };
  }, [category, apiModules]);
  // -------------------------------------------------------------------------------

  // A stable key that changes when the module list changes forces a remount of ChaptersList
  const modulesKey = useMemo(
    () =>
      apiModules.length === 0
        ? "empty"
        : apiModules.map((m) => `${m.id}:${m.order}`).join("|"),
    [apiModules]
  );

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course modules
        <Button onClick={() => setIsCreating((c) => !c)} variant="ghost">
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
        <div
          className={cn(
            "text-sm mt-2",
            apiModules.length === 0 && "text-slate-500 italic"
          )}
        >
          {loading && "Loading modules..."}
          {!loading && apiModules.length === 0 && "No chapters"}
          {categoryForList && (
            <ChaptersList
              key={modulesKey}                // forces update when modules change
              category={categoryForList}      // ✔ now matches ChaptersListProps
            />
          )}
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

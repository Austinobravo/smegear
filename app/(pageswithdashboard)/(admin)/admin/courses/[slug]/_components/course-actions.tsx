"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import React from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CourseActionsProps {
  disabled: boolean;
  courseId: string;
  published: boolean;
}

const CourseActions = ({ disabled, courseId, published }: CourseActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  // Toggle publish/unpublish — PATCH /api/courses { id, published }
  const handlePublish = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/courses`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // send auth cookies
        body: JSON.stringify({ id: courseId, published: !published }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || `Request failed: ${res.status}`);
      }

      toast.success(published ? "Course unpublished" : "Course published");
      router.refresh?.();
    } catch (e: any) {
      toast.error(e?.message || "Failed to update publish status");
    } finally {
      setIsLoading(false);
    }
  };

  // Delete — DELETE /api/courses with body { id }
  const onDelete = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/courses`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // send auth cookies
        body: JSON.stringify({ id: courseId }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "Failed to delete course");
      }

      toast.success("Course deleted successfully");
      router.push("/admin/courses");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={handlePublish}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {published ? "Unpublish" : "Publish"}
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" disabled={isLoading}>
            <Trash className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={onDelete} disabled={isLoading}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseActions;

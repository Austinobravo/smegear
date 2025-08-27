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
          <Button aria-label="Delete a course" className="" size="sm" disabled={isLoading}>
            <Trash className="h-4 w-4  " aria-hidden />
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
            <Button
              onClick={onDelete}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 hover:bg-smegear-secondary bg-smegear-secondary"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-8 w-8 text-white"
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

                </>
              ) : (
                "Continue"
              )}
            </Button>

          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseActions;

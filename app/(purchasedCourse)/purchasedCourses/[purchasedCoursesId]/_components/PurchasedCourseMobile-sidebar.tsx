"use client";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import LessonSidebar, { Module } from "./LessonSidebar";
import { ReactNode, useState } from "react";

export default function PurchasedCourseMobileSidebar({
  trigger,
  modules,
  courseTitle
}: {
  trigger: ReactNode;
  modules: Module[];
  courseTitle: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-[300px]">
        <SheetTitle />
        <LessonSidebar
          modules={modules}
          courseTitle={courseTitle}
          onNavigate={() => setOpen(false)} // ✅ close when a link is clicked
        />
      </SheetContent>
    </Sheet>
  );
}

"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LessonSidebar, { Module } from "./LessonSidebar";
import { ReactNode } from "react";

export default function PurchasedCourseMobileSidebar({
  trigger,
  modules,
  courseTitle
}: {
  trigger: ReactNode;
  modules: Module[];
  courseTitle: string;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-[300px]">
        <LessonSidebar modules={modules} courseTitle={courseTitle} />
      </SheetContent>
    </Sheet>
  );
}

"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LessonSidebar, { Module } from "./LessonSidebar";
import { ReactNode } from "react";

type Props = {
  trigger: ReactNode;
  modules: Module[];
  courseTitle: string;
};

const PurchasedCourseMobileSidebar = ({ trigger, modules, courseTitle }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-[300px]">
        <LessonSidebar modules={modules} courseTitle={courseTitle} />
      </SheetContent>
    </Sheet>
  );
};

export default PurchasedCourseMobileSidebar;

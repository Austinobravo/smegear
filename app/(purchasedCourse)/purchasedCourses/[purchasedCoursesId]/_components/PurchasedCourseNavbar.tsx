"use client";

import { Suspense } from "react";
import { CircleUser, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PurchasedCourseMobileSidebar from "./PurchasedCourseMobile-sidebar";
import type { Module } from "./LessonSidebar";

type Props = {
  courseTitle: string;
  modules: Module[];
};

const PurchasedCourseNavbar = ({ courseTitle, modules }: Props) => {
  return (
    <Suspense fallback={<div className="text-center">loading...</div>}>
      <div className="p-4 border-b h-full flex items-center justify-between bg-white shadow-sm">
        <div className="flex items-center gap-3">
          {/* Mobile lessons drawer trigger */}
          <PurchasedCourseMobileSidebar
            trigger={
              <button
                className="md:hidden pr-2 hover:opacity-80 transition"
                aria-label="Open lessons"
              >
                <Menu />
              </button>
            }
            modules={modules}
            courseTitle={courseTitle}
          />
          <span className="font-bold truncate text-lg  max-w-[55vw]">
            {courseTitle}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/student">
            <Button className="bg-smegear-secondary hover:bg-smegear-accent">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
          <CircleUser
            size={32}
            className="bg-smegear-secondary rounded-full text-white border-none hover:bg-smegear-accent"
          />
        </div>
      </div>
    </Suspense>
  );
};

export default PurchasedCourseNavbar;

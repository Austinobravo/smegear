"use client";
import { CircleUser, LogOut } from "lucide-react";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PurchasedCourseNavbarRoutes = () => {
  return (
    <Suspense fallback={<div className="text-center">loading...</div>}>
      <div className="w-full">
        <div className="flex justify-end items-center gap-2 ml-auto">
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

export default PurchasedCourseNavbarRoutes;

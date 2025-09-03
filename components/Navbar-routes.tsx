"use client";

import { CircleUser, LogOut, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Input } from "./ui/input"; // assuming you're using shadcn UI
import StudentSearchInput from "@/app/(pageswithdashboard)/(students)/student/search/_components/StudentSearchInput";
const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isAdmin = pathname?.startsWith("/admin");
  const isChapter = pathname?.startsWith("/chapter");
  const isStudentSearch = pathname?.startsWith("/student/search");

  const [search, setSearch] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (isStudentSearch) {
        const params = new URLSearchParams();
        if (search.trim()) {
          params.set("q", search.trim());
        }
        router.replace(`/student/search?${params.toString()}`);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <Suspense fallback={<div className='text-center'>loading...</div>}>
      <div className="w-full">
        {isStudentSearch && (
          <div className="flex items-center justify-between gap-2 w-full max-w-5xl mx-auto">
            {/* studentsearchinput */}
            <StudentSearchInput />
            <div className="flex justify-end items-center gap-2 ml-auto">
              <Link href="/admin/courses">
                <Button className="bg-smegear-secondary hover:bg-smegear-accent">
                  Admin mode
                </Button>
              </Link>
              <CircleUser
                size={32}
                className="bg-smegear-secondary rounded-full text-white border-none hover:bg-smegear-accent"
              />
            </div>
          </div>
        )}

        {!isStudentSearch &&
          (isAdmin || isChapter ? (
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
          ) : (
            <div className="flex justify-end items-center gap-2 ml-auto">
              <Link href="/admin/courses">
                <Button className="bg-smegear-secondary hover:bg-smegear-accent">
                  Admin mode
                </Button>
              </Link>
              <CircleUser
                size={32}
                className="bg-smegear-secondary rounded-full text-white border-none hover:bg-smegear-accent"
              />
            </div>
          ))}
      </div>
    </Suspense>

  );
};

export default NavbarRoutes;

"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useUrlQueryState } from "@/hooks/useUrlQueryState"; // adjust path as needed

const StudentSearchInput: React.FC = () => {
  const [q, setQ] = useUrlQueryState("q");

  return (
    <div className="relative w-full  max-w-xl">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search courses..."
        className="pl-9 pr-4 py-2 rounded-md border-2 border-gray-900 border-input md:w-[60%] bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-smegear-secondary"
        aria-label="Search courses"
      />
    </div>
  );
};

export default StudentSearchInput;

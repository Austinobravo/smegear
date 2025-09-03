"use client"

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = pathname === href;

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 relative w-full",
        isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-4 w-full">
        <Icon size={22} className={cn("text-slate-500", isActive && "text-smegear-accent")} />
        <span className={cn(isActive && "text-smegear-accent font-semibold")}>{label}</span>
      </div>
      {/* Active bar on the right */}
      <div
        className={cn(
          "absolute right-0 top-2 bottom-2 w-1 rounded-full bg-smegear-secondary opacity-0 transition-all",
          isActive && "opacity-100"
        )}
        style={isActive ? { height: "calc(100% - 1rem)" } : {}}
      />
    </button>
  );
};

export default SidebarItem;
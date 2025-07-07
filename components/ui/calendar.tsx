"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 relative", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2 w-full",
        month: "flex flex-col gap-4 flex-1",
        caption: "flex justify-center pt-1 relative items-center w-full border border-red-500",
        caption_label: "flex justify-center items-center",
        nav: "flex items-center gap-1",
        button_previous: "absolute left-1",
        button_next: "absolute right-1",
        month_grid: "w-full border-collapse space-x-1",
        weekdays: "flex justify-between",
        weekday:
          "text-muted-foreground rounded-md w-8 font-normal text-base",
        week: "flex w-full mt-4",
        day: cn(
          "size-9 transition-colors duration-200 ease-in-out flex items-center justify-center cursor-pointer text-lg",
          "hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
        ),
        
        range_start:
          "day-range-start rounded-full aria-selected:bg-primary aria-selected:text-primary-foreground",
        range_end:
          "day-range-end border aria-selected:bg-primary aria-selected:text-primary-foreground",
        selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "text-accent-foreground",
        outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        disabled: "text-muted-foreground opacity-50 cursor-not-allowed",
        range_middle:
          "aria-selected:bg-[#FFF5DD]  aria-selected:text-black",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Nav: ({ onPreviousClick, onNextClick }) => (
          <>
            <button
              type="button"
              onClick={onPreviousClick}
              className="absolute left-4 top-2 hover:bg-gray-100 rounded-lg p-2"
            >
              <ChevronLeft className="h-5 w-5 opacity-50 hover:opacity-100" />
            </button>
            <button
              type="button"
              onClick={onNextClick}
              className="absolute right-5 top-2 hover:bg-gray-100 rounded-lg p-2"
            >
              <ChevronRight className="h-5 w-5 opacity-50 hover:opacity-100" />
            </button>
          </>
        ),
      }}

      
      
      {...props}
    />
  )
}

export { Calendar }


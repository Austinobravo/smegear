"use client"

import { ColumnDef } from "@tanstack/react-table"
import Items from "@/Data/items"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const { id, name, isPublished,price } = Items[0]; // Example destructuring for type inference
export const columns: ColumnDef<typeof Items>[] = [

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2"
        >
          Title
          <ArrowUpDown className="h-4 w-4 ml-2" />
        </Button>
      )
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2"
        >
          Price
          <ArrowUpDown className="h-4 w-4 ml-2" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const price =parseFloat (row.getValue("price") || "0");
      const formatted = new Intl.NumberFormat("en-US", { style: "currency", currency: "NGN" }).format(price);
      return (
        <div className="text-sm font-medium">
          {formatted}
        </div>
      )
    }
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2"
        >
          Published
          <ArrowUpDown className="h-4 w-4 ml-2" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished")|| false;
      return (
        <Badge className={cn("bg-slate-500", isPublished && "bg-sky-700")}>
          {isPublished ? "Published" : "Draft"}
        </Badge>
      )
    }
  },
  {
    id: "actions", cell: ({ row }) => {
      const { } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/admin/courses/${id}`} passHref>
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                Edit </DropdownMenuItem>
            </Link>

          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  },
]
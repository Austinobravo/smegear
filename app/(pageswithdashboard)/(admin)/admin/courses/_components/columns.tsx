'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Shape the table expects
export type CourseRow = {
  id: string;
  title: string;
  price: number;
  published: boolean;
};

function ActionsCell({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const ok = window.confirm('Delete this course? This cannot be undone.');
    if (!ok) return;

    try {
      const res = await fetch('/api/courses', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // send NextAuth cookies
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.log(err)
        throw new Error(err?.message || `Request failed: ${res.status}`);
      }

      toast.success('Course deleted');
      router.refresh(); // repull server data (or lift state and remove row)
    } catch (e: any) {
      toast.error(e?.message || 'Failed to delete course');
    }
  };

  return (
    <div className="flex items-center gap-1">
      {/* Delete button */}
      <Button
        type="button"
        variant="ghost"
        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
        onClick={handleDelete}
        aria-label="Delete course"
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      {/* Existing dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/admin/courses/${id}`} className="flex items-center">
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export const columns: ColumnDef<CourseRow>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="flex items-center gap-2"
      >
        Title
        <ArrowUpDown className="h-4 w-4 ml-2" />
      </Button>
    ),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="flex items-center gap-2"
      >
        Price
        <ArrowUpDown className="h-4 w-4 ml-2" />
      </Button>
    ),
    cell: ({ row }) => {
      const price = Number(row.getValue('price') ?? 0);
      const formatted = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
      }).format(price);
      return <div className="text-sm font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'published',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="flex items-center gap-2"
      >
        Published
        <ArrowUpDown className="h-4 w-4 ml-2" />
      </Button>
    ),
    cell: ({ row }) => {
      const published = Boolean(row.getValue('published'));
      return (
        <Badge className={cn('bg-slate-500', published && 'bg-sky-700')}>
          {published ? 'Published' : 'Draft'}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell id={row.original.id} />,
  },
];

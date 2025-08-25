"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import React from 'react'
import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CourseActionsProps {
  disabled: boolean;
  courseId: string;
  published: boolean;
}
const CourseActions = ({ disabled, courseId, published }: CourseActionsProps) => {
  const router=useRouter();
  const [isLoading,setIsLoading]=React.useState(false);

  const onDelete=async()=>{
    setIsLoading(true);
    try {
      const res=await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/${courseId}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        }
      });
      toast.success("Course deleted successfully");
      if(!res.ok){
        throw new Error("Failed to delete course");
      }
      router.push("/admin/courses");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }finally{
      setIsLoading(false);
    }
  }
  return (
    <div className='flex items-center gap-x-2'><Button onClick={() => { }} disabled={disabled || isLoading} variant="outline" size="sm">{published ? "Unpublish" : "Publish"}</Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" >
            <Trash className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={onDelete}disabled={isLoading}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CourseActions
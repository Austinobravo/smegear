import React from "react";
import { IconBadge } from "@/components/icon-badge";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";
import CategoryForm from "./_components/category-form";
import PriceForm from "./_components/price-form";
import AttachmentForm from "./_components/attachment-form";
import ChaptersForm from "./_components/modules-form";
import Items from "@/Data/items";
import { notFound } from "next/navigation";
import prisma from "@/prisma/prisma";
import axios from "axios";

interface PageProps {
  params: Promise<{ id: string }>;
}
const fetchAdminCoursesId = async (id: string) => {
  try{
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/${id}`)
    console.log("response", response)
    return response.data

  }catch(error){
    console.error("error", error)
    return null
  }
}
const AdminCoursesPage= async({ params }: PageProps)=> {
  const id = (await params).id
  const course = await fetchAdminCoursesId(id);

  if (!course) return notFound();

  return (
    <div className="p-6">
      {/* Show the specific course title based on its id */}
      <h1 className="text-2xl font-semibold">{course.title}</h1>

      <div className="flex items-center justify-between mt-2">
        <div className="flex flex-col gap-y-2">
          <span className="text-muted-foreground">Complete all fields (1/6)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          {/* Pass the course down if TitleForm needs it */}
          <TitleForm category={course} />
          <DescriptionForm category={course} />
          <ImageForm />
          <CategoryForm />
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">Course modules</h2>
            </div>
            <ChaptersForm category={course} />
          </div>

          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={CircleDollarSign} />
              <h2 className="text-xl">Sell your course</h2>
            </div>
            <PriceForm />
          </div>

          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={File} />
              <h2 className="text-xl">Resource & Attachments</h2>
            </div>
            <AttachmentForm />
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminCoursesPage;
import courses from '@/Data/popularcourseslist'
import PurchasedCourseSidebar from './_components/purchasedcourse-sidebar';
import { notFound } from 'next/navigation';


const PurchasedCoursesLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: number }>;
}) => {
  const id = (await params).id
  const category = courses.find((cat) => cat.id === id);
  if (!category) return notFound()

  // Safely log the title (avoids crash if category is undefined)
  console.log("Course Title:", category?.title ?? "Not found");

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <PurchasedCourseSidebar category={category} />
      </div>
      <main className="md:pl-80 h-full">

        {children}
      </main>
    </div>
  )

}

export default PurchasedCoursesLayout
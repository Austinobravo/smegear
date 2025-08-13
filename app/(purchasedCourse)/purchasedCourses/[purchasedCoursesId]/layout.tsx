import courses from '@/Data/popularcourseslist'
import PurchasedCourseSidebar from './_components/purchasedcourse-sidebar';


const PurchasedCoursesLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: number };
}) => {
  const category = courses.find((cat) => cat.id === params.id);

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
// app/(courses)/courses/[coursedetails]/loading.tsx
export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto p-2 md:p-6 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl overflow-hidden border">
            <div className="w-full h-[400px] bg-gray-200" />
          </div>
          <div className="space-y-3">
            <div className="h-6 bg-gray-200 w-1/3 rounded" />
            <div className="h-8 bg-gray-200 w-2/3 rounded" />
            <div className="h-4 bg-gray-200 w-full rounded" />
            <div className="h-4 bg-gray-200 w-5/6 rounded" />
          </div>
          <div className="h-10 bg-gray-200 w-1/2 rounded" />
          <div className="h-64 bg-gray-200 rounded" />
        </div>

        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <div className="w-full h-48 bg-gray-200 rounded mb-4" />
            <div className="h-8 bg-gray-200 w-1/3 rounded mb-4" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-11 bg-gray-200 rounded col-span-2" />
              <div className="h-11 bg-gray-200 rounded" />
              <div className="h-11 bg-gray-200 rounded" />
            </div>
            <div className="border-t mt-4 pt-4 space-y-2">
              <div className="h-5 bg-gray-200 w-1/2 rounded" />
              <div className="h-4 bg-gray-200 w-full rounded" />
              <div className="h-4 bg-gray-200 w-5/6 rounded" />
            </div>
          </div>
          <div className="h-11 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

// app/(courses)/courses/[coursedetails]/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold">Course not found</h1>
      <p className="text-muted-foreground mt-2">
        We couldn’t find the course you’re looking for.
      </p>
      <Link
        href="/courses"
        className="inline-block mt-6 px-4 py-2 rounded-md bg-smegear-secondary text-white font-semibold"
      >
        Back to courses
      </Link>
    </div>
  );
}

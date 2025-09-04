import Link from "next/link";

type LessonHeaderProps = {
  title: string;
  duration?: string;
  prevHref?: string;
  nextHref?: string;
};

export function LessonHeader({ title, duration, prevHref, nextHref }: LessonHeaderProps) {
  return (
    <div className="flex items-center justify-between mt-3 mb-2">
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        {duration ? <p className="text-sm text-gray-500">Duration: {duration}</p> : null}
      </div>
      <div className="flex items-center gap-2">
        <Link
          href={prevHref ?? "#"}
          aria-disabled={!prevHref}
          className={`px-3 py-2 rounded border text-sm ${
            prevHref ? "hover:bg-gray-50" : "opacity-40 pointer-events-none"
          }`}
        >
          ← Previous
        </Link>
        <Link
          href={nextHref ?? "#"}
          aria-disabled={!nextHref}
          className={`px-3 py-2 rounded border text-sm ${
            nextHref ? "hover:bg-gray-50" : "opacity-40 pointer-events-none"
          }`}
        >
          Next →
        </Link>
      </div>
    </div>
  );
}
export default LessonHeader;

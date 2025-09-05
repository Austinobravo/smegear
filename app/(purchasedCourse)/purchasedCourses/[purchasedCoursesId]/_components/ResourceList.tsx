export type Resource = { name: string; url: string };

export default function ResourceList({ resources }: { resources: Resource[] }) {
  if (!resources?.length) return null;
  return (
    <div className="mt-4">
      <h4 className="text-sm font-semibold mb-2">Resources</h4>
      <ul className="space-y-2">
        {resources.map((r) => (
          <li key={r.url}>
            <a
              href={r.url}
              className="flex items-center gap-2 px-3 py-2 rounded border text-sm hover:bg-gray-50"
              download
            >
              <span className="inline-block w-5 h-5 rounded bg-gray-200" aria-hidden />
              {r.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

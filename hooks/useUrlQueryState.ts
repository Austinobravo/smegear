"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Keeps a string state in sync with a URL query param.
 * Example: const [q, setQ] = useUrlQueryState('q');
 */
export function useUrlQueryState(param: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // derive current value from the URL
  const currentFromUrl = searchParams.get(param) ?? "";

  // local state to avoid controlled/uncontrolled flicker
  const [value, setValue] = useState(currentFromUrl);

  // when the URL changes externally, reflect it in local state
  useEffect(() => {
    setValue(currentFromUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFromUrl]);

  const set = useCallback(
    (next: string) => {
      setValue(next);
      const p = new URLSearchParams(searchParams.toString());
      if (next) p.set(param, next);
      else p.delete(param);
      router.replace(`${pathname}?${p.toString()}`, { scroll: false });
    },
    [param, pathname, router, searchParams]
  );

  return [value, set] as const;
}

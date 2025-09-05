export function clearUserWatchCache(userId: string) {
  if (typeof window === "undefined") return;
  try {
    const prefixPct = `${userId}:pct:`;
    const prefixTime = `${userId}:time:`;
    // iterate backwards since we'll remove keys during the loop
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (!k) continue;
      if (k.startsWith(prefixPct) || k.startsWith(prefixTime)) {
        localStorage.removeItem(k);
      }
    }
    // notify UI to refresh (optional)
    window.dispatchEvent(new CustomEvent("lesson-progress", { detail: { userId } }));
  } catch {}
}

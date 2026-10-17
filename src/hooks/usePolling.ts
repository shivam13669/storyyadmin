import { useEffect, useRef } from "react";

export function usePolling(poll: () => Promise<void>, intervalMs: number, enabled = true) {
  const pollRef = useRef(poll);
  pollRef.current = poll;

  useEffect(() => {
    if (!enabled) return;

    let active = true;
    let timer: number | undefined;

    const run = async () => {
      try {
        await pollRef.current();
      } catch (error) {
        console.error("Polling failed:", error);
      } finally {
        if (active) {
          timer = window.setTimeout(run, intervalMs);
        }
      }
    };

    run();

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [intervalMs, enabled]);
}

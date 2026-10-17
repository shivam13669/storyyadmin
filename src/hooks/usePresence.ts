import { useEffect } from "react";
import { sendMessagePresence } from "@/lib/api";

const PRESENCE_INTERVAL_MS = 15000;

export function usePresence(userId: number | undefined, role: "user" | "admin") {
  useEffect(() => {
    if (!userId) return;

    const beat = () => {
      sendMessagePresence(userId, role).catch(() => {});
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") beat();
    };

    beat();
    const interval = window.setInterval(beat, PRESENCE_INTERVAL_MS);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [userId, role]);
}

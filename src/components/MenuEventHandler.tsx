"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "./ThemeProvider";

type Theme = "dark" | "light" | "system";

export default function MenuEventHandler() {
  const router = useRouter();
  const { setTheme } = useTheme();

  useEffect(() => {
    let unlistenNavigate: (() => void) | null = null;
    let unlistenTheme: (() => void) | null = null;

    const setupListeners = async () => {
      try {
        // Try to import Tauri API - will fail gracefully in browser
        const { listen } = await import("@tauri-apps/api/event");

        // Listen for navigation events from menu
        unlistenNavigate = await listen<string>("navigate", (event) => {
          router.push(event.payload);
        });

        // Listen for theme change events from menu
        unlistenTheme = await listen<Theme>("set-theme", (event) => {
          setTheme(event.payload);
        });
      } catch {
        // Not in Tauri environment - this is expected when running in browser
      }
    };

    setupListeners();

    // Cleanup listeners on unmount
    return () => {
      if (unlistenNavigate) unlistenNavigate();
      if (unlistenTheme) unlistenTheme();
    };
  }, [router, setTheme]);

  return null; // This component doesn't render anything
}

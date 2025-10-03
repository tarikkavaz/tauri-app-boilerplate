"use client";

import { usePathname } from "next/navigation";
import Navigation from "./Navigation";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAboutPage = pathname === "/about";

  if (isAboutPage) {
    // For About page: render without navigation or drag region
    return <>{children}</>;
  }

  // For all other pages: render with navigation and drag region
  return (
    <div className="w-full h-screen flex flex-col">
      <div
        data-tauri-drag-region
        className="h-12 w-full flex items-center justify-center select-none bg-white dark:bg-gray-900 transition-colors"
      >
        {/* <span className="text-sm font-medium text-gray-500">Tauri Plugins Demo</span> */}
      </div>
      <Navigation />
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-950 transition-colors">
        {children}
      </div>
    </div>
  );
}

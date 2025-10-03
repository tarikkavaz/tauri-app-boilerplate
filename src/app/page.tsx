import Link from "next/link";
import { Clipboard, MessageSquare, Folder, Bell, Monitor, CheckCircle, ArrowRight } from "lucide-react";

const plugins = [
  {
    name: "Clipboard Manager",
    description: "Read and write to the system clipboard",
    icon: Clipboard,
    href: "/clipboard",
    status: "completed",
  },
  {
    name: "Dialog",
    description: "Open file, save, and message dialogs",
    icon: MessageSquare,
    href: "/dialog",
    status: "completed",
  },
  {
    name: "File System",
    description: "Read, write, and manage files and directories",
    icon: Folder,
    href: "/filesystem",
    status: "completed",
  },
  {
    name: "Notifications",
    description: "Send native system notifications",
    icon: Bell,
    href: "/notifications",
    status: "completed",
  },
  {
    name: "OS Information",
    description: "Get system and platform information",
    icon: Monitor,
    href: "/os-info",
    status: "completed",
  },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto py-8">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
        Tauri + Next.js Boilerplate
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Explore and test various Tauri plugins with interactive examples
        </p>
      </header>

      <div className="mb-12 mx-6 bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About This Boilerplate</h3>
        <div className="text-gray-600 dark:text-gray-400 space-y-3">
          <p>
            This application demonstrates the integration of various Tauri plugins in a Next.js application.
            Each plugin page provides interactive examples and sample code to help you understand how to use them.
          </p>
          <div className="flex gap-4 pt-4">
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="text-gray-700 dark:text-gray-300 font-semibold">Framework</div>
              <div className="text-gray-900 dark:text-white">Next.js 15 + Tauri 2.8</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="text-gray-700 dark:text-gray-300 font-semibold">Language</div>
              <div className="text-gray-900 dark:text-white">TypeScript + Rust</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="text-gray-700 dark:text-gray-300 font-semibold">Styling</div>
              <div className="text-gray-900 dark:text-white">Tailwind CSS 4</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {plugins.map((plugin) => {
          const Icon = plugin.icon;
          return (
            <Link
              key={plugin.href}
              href={plugin.href}
              className="group bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <Icon className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                      {plugin.name}
                    </h2>
                    {plugin.status === "completed" && (
                      <CheckCircle className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {plugin.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 text-gray-700 dark:text-gray-300 text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                View Demo <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}

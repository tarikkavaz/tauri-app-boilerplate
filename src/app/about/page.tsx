"use client";

import Image from "next/image";
import { ExternalLink, Code, Users, Scale, Package } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 p-8">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
        {/* Header with Logo */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
              <Image
                src="/logo.png"
                alt="App Logo"
                width={64}
                height={64}
                className="rounded-xl"
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Tauri App Boilerplate
          </h1>
          <p className="text-blue-100 text-sm">
            Version 0.1.0
          </p>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Description */}
          <div className="text-center">
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              A modern Tauri + Next.js boilerplate application with plugin integrations.
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            {/* Authors */}
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                  Authors
                </div>
                <div className="text-sm text-gray-900 dark:text-gray-100">
                  Your Name
                </div>
              </div>
            </div>

            {/* License */}
            <div className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                  License
                </div>
                <div className="text-sm text-gray-900 dark:text-gray-100">
                  MIT License
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="flex items-start gap-3">
              <Code className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                  Copyright
                </div>
                <div className="text-sm text-gray-900 dark:text-gray-100">
                  Copyright © 2025
                </div>
              </div>
            </div>

            {/* Website */}
            <div className="flex items-start gap-3">
              <ExternalLink className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                  Website
                </div>
                <a
                  href="https://github.com/tarikkavaz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  github.com/tarikkavaz
                </a>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-4 h-4 text-gray-400" />
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Built With
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md font-medium">
                Tauri 2.8
              </span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md font-medium">
                Next.js 15
              </span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md font-medium">
                React 19
              </span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md font-medium">
                TypeScript
              </span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md font-medium">
                Rust
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

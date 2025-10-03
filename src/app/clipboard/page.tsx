"use client";

import { useState } from "react";
import { writeText, readText, writeHtml, clear } from "@tauri-apps/plugin-clipboard-manager";
import { Clipboard, FileText, Code, Trash2, CheckCircle, XCircle } from "lucide-react";

export default function ClipboardPage() {
  const [clipboardContent, setClipboardContent] = useState("");
  const [inputText, setInputText] = useState("Hello from Tauri!");
  const [status, setStatus] = useState("");

  const handleWriteText = async () => {
    try {
      await writeText(inputText);
      setStatus("✓ Text written to clipboard");
      setTimeout(() => setStatus(""), 2000);
    } catch (error) {
      setStatus("✗ Error writing to clipboard");
      console.error(error);
    }
  };

  const handleReadText = async () => {
    try {
      const text = await readText();
      setClipboardContent(text || "(empty)");
      setStatus("✓ Text read from clipboard");
      setTimeout(() => setStatus(""), 2000);
    } catch (error) {
      setStatus("✗ Error reading from clipboard");
      console.error(error);
    }
  };

  const handleWriteHtml = async () => {
    try {
      await writeHtml("<h1>Hello Tauri!</h1><p>This is <strong>HTML</strong> content</p>");
      setStatus("✓ HTML written to clipboard");
      setTimeout(() => setStatus(""), 2000);
    } catch (error) {
      setStatus("✗ Error writing HTML");
      console.error(error);
    }
  };

  const handleClear = async () => {
    try {
      await clear();
      setClipboardContent("");
      setStatus("✓ Clipboard cleared");
      setTimeout(() => setStatus(""), 2000);
    } catch (error) {
      setStatus("✗ Error clearing clipboard");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <Clipboard className="w-10 h-10 text-gray-700 dark:text-gray-300" />
          Clipboard Manager
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Read and write to the system clipboard</p>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        {status && (
          <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 flex items-center gap-2">
            {status.includes("✓") ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
            {status}
          </div>
        )}

        <div className="space-y-4">
          <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Text to write
              </label>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                placeholder="Enter text to copy..."
              />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleWriteText}
              className="px-4 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-medium rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Write Text
            </button>
            <button
              onClick={handleReadText}
              className="px-4 py-3 bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 text-white font-medium rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <Clipboard className="w-4 h-4" />
              Read Text
            </button>
            <button
              onClick={handleWriteHtml}
              className="px-4 py-3 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-400 text-white font-medium rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <Code className="w-4 h-4" />
              Write HTML
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-3 bg-gray-500 hover:bg-gray-600 dark:bg-gray-400 dark:hover:bg-gray-300 text-white dark:text-gray-900 font-medium rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear Clipboard
            </button>
          </div>

          {clipboardContent && (
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Clipboard Content
                </label>
                <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-md text-gray-900 dark:text-white font-mono text-sm break-all">
                  {clipboardContent}
                </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Available Functions</h3>
        <div className="space-y-2 text-gray-600 dark:text-gray-400 text-sm font-mono">
          <div><span className="text-gray-900 dark:text-white">writeText(text)</span> - Write plain text to clipboard</div>
          <div><span className="text-gray-900 dark:text-white">readText()</span> - Read text from clipboard</div>
          <div><span className="text-gray-900 dark:text-white">writeHtml(html)</span> - Write HTML to clipboard</div>
          <div><span className="text-gray-900 dark:text-white">clear()</span> - Clear clipboard content</div>
        </div>
      </div>
    </div>
  );
}

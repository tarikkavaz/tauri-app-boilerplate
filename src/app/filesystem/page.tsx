"use client";

import { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import {
  readTextFile,
  writeTextFile,
  readDir,
  exists,
  remove,
  mkdir,
  stat,
} from "@tauri-apps/plugin-fs";
import { documentDir } from "@tauri-apps/api/path";
import { 
  Folder, FileText, FolderOpen, FileSearch, Trash2, 
  FolderPlus, Info, CheckCircle, XCircle 
} from "lucide-react";

export default function FileSystemPage() {
  const [status, setStatus] = useState("");
  const [result, setResult] = useState("");
  const [selectedPath, setSelectedPath] = useState("");
  const [textContent, setTextContent] = useState("Hello from Tauri File System!");

  const showStatus = (msg: string) => {
    setStatus(msg);
    setTimeout(() => setStatus(""), 3000);
  };

  const handleSelectFile = async () => {
    try {
      const selected = await open({
        multiple: false,
        directory: false,
        filters: [
          {
            name: "Text Files",
            extensions: ["txt", "md", "json", "xml", "html", "css", "js", "ts", "tsx", "jsx"],
          },
          {
            name: "All Files",
            extensions: ["*"],
          },
        ],
      });
      if (selected) {
        setSelectedPath(selected as string);
        showStatus("✓ File selected");
      }
    } catch (error) {
      showStatus("✗ Error selecting file");
      console.error(error);
    }
  };

  const handleSelectDirectory = async () => {
    try {
      const selected = await open({
        directory: true,
        multiple: false,
      });
      if (selected) {
        setSelectedPath(selected as string);
        showStatus("✓ Directory selected");
      }
    } catch (error) {
      showStatus("✗ Error selecting directory");
      console.error(error);
    }
  };

  const handleReadFile = async () => {
    if (!selectedPath) {
      showStatus("✗ Please select a file first");
      return;
    }
    try {
      const content = await readTextFile(selectedPath);
      setResult(`File Content:\n${content}`);
      showStatus("✓ File read successfully");
    } catch (error) {
      showStatus("✗ Error reading file");
      console.error(error);
      setResult(`Error: ${error}`);
    }
  };

  const handleWriteFile = async () => {
    if (!selectedPath) {
      showStatus("✗ Please select a file first");
      return;
    }
    try {
      await writeTextFile(selectedPath, textContent);
      showStatus("✓ File written successfully");
      setResult(`Written to: ${selectedPath}`);
    } catch (error) {
      showStatus("✗ Error writing file");
      console.error(error);
      setResult(`Error: ${error}`);
    }
  };

  const handleReadDirectory = async () => {
    if (!selectedPath) {
      showStatus("✗ Please select a directory first");
      return;
    }
    try {
      const entries = await readDir(selectedPath);
      const fileList = entries
        .map((entry) => `${entry.isDirectory ? "📁" : "📄"} ${entry.name}`)
        .join("\n");
      setResult(`Directory Contents:\n${fileList}`);
      showStatus(`✓ Found ${entries.length} items`);
    } catch (error) {
      showStatus("✗ Error reading directory");
      console.error(error);
      setResult(`Error: ${error}`);
    }
  };

  const handleCheckExists = async () => {
    if (!selectedPath) {
      showStatus("✗ Please select a path first");
      return;
    }
    try {
      const doesExist = await exists(selectedPath);
      setResult(`Path exists: ${doesExist ? "Yes ✓" : "No ✗"}`);
      showStatus(doesExist ? "✓ Path exists" : "✗ Path does not exist");
    } catch (error) {
      showStatus("✗ Error checking existence");
      console.error(error);
      setResult(`Error: ${error}`);
    }
  };

  const handleGetStats = async () => {
    if (!selectedPath) {
      showStatus("✗ Please select a path first");
      return;
    }
    try {
      const stats = await stat(selectedPath);
      setResult(
        `File Statistics:\n` +
          `Type: ${stats.isDirectory ? "Directory" : "File"}\n` +
          `Size: ${stats.size} bytes\n` +
          `Created: ${new Date(stats.birthtime ?? 0).toLocaleString()}\n` +
          `Modified: ${new Date(stats.mtime ?? 0).toLocaleString()}\n` +
          `Accessed: ${new Date(stats.atime ?? 0).toLocaleString()}`
      );
      showStatus("✓ Stats retrieved");
    } catch (error) {
      showStatus("✗ Error getting stats");
      console.error(error);
      setResult(`Error: ${error}`);
    }
  };

  const handleCreateDirectory = async () => {
    try {
      const docDir = await documentDir();
      const newDirPath = `${docDir}/TauriTestDir`;
      await mkdir(newDirPath);
      setSelectedPath(newDirPath);
      setResult(`Created directory: ${newDirPath}`);
      showStatus("✓ Directory created");
    } catch (error) {
      showStatus("✗ Error creating directory");
      console.error(error);
      setResult(`Error: ${error}`);
    }
  };

  const handleRemove = async () => {
    if (!selectedPath) {
      showStatus("✗ Please select a path first");
      return;
    }
    try {
      await remove(selectedPath);
      setResult(`Removed: ${selectedPath}`);
      setSelectedPath("");
      showStatus("✓ Path removed");
    } catch (error) {
      showStatus("✗ Error removing path");
      console.error(error);
      setResult(`Error: ${error}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <Folder className="w-10 h-10 text-gray-700 dark:text-gray-300" />
          File System
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Read, write, and manage files and directories
        </p>
      </header>

      {status && (
        <div className="mb-6 p-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 flex items-center gap-2">
          {status.includes("✓") ? <CheckCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" /> : <XCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />}
          {status}
        </div>
      )}

      <div className="space-y-6">
        {/* Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Select Path
          </h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={handleSelectFile}
              className="px-4 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white dark:text-gray-900 font-medium rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Select File
            </button>
            <button
              onClick={handleSelectDirectory}
              className="px-4 py-3 bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 text-white dark:text-gray-900 font-medium rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <FolderOpen className="w-4 h-4" />
              Select Directory
            </button>
          </div>
          {selectedPath && (
            <div className="p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md text-gray-700 text-sm break-all">
              <span className="text-gray-500">Selected:</span> {selectedPath}
            </div>
          )}
        </div>

        {/* File Operations */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            File Operations
          </h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Text to write
              </label>
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 min-h-[100px]"
                placeholder="Enter text content..."
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleReadFile}
                className="px-4 py-3 bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 text-white dark:text-gray-900 font-medium rounded-md transition-colors"
              >
                Read File
              </button>
              <button
                onClick={handleWriteFile}
                className="px-4 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white dark:text-gray-900 font-medium rounded-md transition-colors"
              >
                Write File
              </button>
            </div>
          </div>
        </div>

        {/* Directory & Info Operations */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Directory & Info
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleReadDirectory}
              className="px-4 py-3 bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 text-white dark:text-gray-900 font-medium rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <Folder className="w-4 h-4" />
              Read Directory
            </button>
            <button
              onClick={handleCheckExists}
              className="px-4 py-3 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-400 text-white dark:text-gray-900 font-medium rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <FileSearch className="w-4 h-4" />
              Check Exists
            </button>
            <button
              onClick={handleGetStats}
              className="px-4 py-3 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-400 text-white dark:text-gray-900 font-medium rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <Info className="w-4 h-4" />
              Get Stats
            </button>
            <button
              onClick={handleCreateDirectory}
              className="px-4 py-3 bg-gray-500 hover:bg-gray-600 dark:bg-gray-400 dark:hover:bg-gray-300 text-white dark:text-gray-900 font-medium rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <FolderPlus className="w-4 h-4" />
              Create Test Dir
            </button>
          </div>
        </div>

        {/* Dangerous Operations */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-300">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-gray-600" />
            Dangerous Operations
          </h2>
          <button
            onClick={handleRemove}
            className="w-full px-4 py-3 bg-gray-500 hover:bg-gray-600 dark:bg-gray-400 dark:hover:bg-gray-300 text-white dark:text-gray-900 font-medium rounded-md transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Remove Selected Path
          </button>
        </div>

        {/* Result Display */}
        {result && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Result</h3>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md text-gray-900 dark:text-white font-mono text-sm whitespace-pre-wrap break-all max-h-96 overflow-auto">
              {result}
            </div>
          </div>
        )}

        {/* API Reference */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Available Functions
          </h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-400 text-sm font-mono">
            <div>
              <span className="text-gray-900">readTextFile()</span> - Read text
              from file
            </div>
            <div>
              <span className="text-gray-900">writeTextFile()</span> - Write
              text to file
            </div>
            <div>
              <span className="text-gray-900">readDir()</span> - List
              directory contents
            </div>
            <div>
              <span className="text-gray-900">exists()</span> - Check if path
              exists
            </div>
            <div>
              <span className="text-gray-900">stat()</span> - Get file/directory
              stats
            </div>
            <div>
              <span className="text-gray-900">mkdir()</span> - Create directory
            </div>
            <div>
              <span className="text-gray-900">remove()</span> - Remove
              file/directory
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

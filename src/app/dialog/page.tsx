"use client";

import { useState } from "react";
import { open, save, message, ask, confirm } from "@tauri-apps/plugin-dialog";
import { 
  MessageSquare, FileText, FolderOpen, Files, Save, 
  Info, HelpCircle, AlertTriangle, CheckCircle, XCircle 
} from "lucide-react";

export default function DialogPage() {
  const [status, setStatus] = useState("");
  const [result, setResult] = useState("");

  const showStatus = (msg: string) => {
    setStatus(msg);
    setTimeout(() => setStatus(""), 3000);
  };

  const handleOpenFile = async () => {
    try {
      const selected = await open({
        multiple: false,
        filters: [
          {
            name: "Images",
            extensions: ["png", "jpg", "jpeg", "gif", "webp"],
          },
          {
            name: "Documents",
            extensions: ["pdf", "doc", "docx", "txt"],
          },
        ],
      });
      if (selected) {
        setResult(`Selected file: ${selected}`);
        showStatus("✓ File selected");
      } else {
        setResult("No file selected");
        showStatus("✗ Selection cancelled");
      }
    } catch (error) {
      showStatus("✗ Error opening file dialog");
      console.error(error);
    }
  };

  const handleOpenMultiple = async () => {
    try {
      const selected = await open({
        multiple: true,
        filters: [
          {
            name: "All Files",
            extensions: ["*"],
          },
        ],
      });
      if (selected && Array.isArray(selected)) {
        setResult(`Selected ${selected.length} files:\n${selected.join("\n")}`);
        showStatus(`✓ ${selected.length} files selected`);
      } else {
        setResult("No files selected");
        showStatus("✗ Selection cancelled");
      }
    } catch (error) {
      showStatus("✗ Error opening file dialog");
      console.error(error);
    }
  };

  const handleOpenDirectory = async () => {
    try {
      const selected = await open({
        directory: true,
        multiple: false,
      });
      if (selected) {
        setResult(`Selected directory: ${selected}`);
        showStatus("✓ Directory selected");
      } else {
        setResult("No directory selected");
        showStatus("✗ Selection cancelled");
      }
    } catch (error) {
      showStatus("✗ Error opening directory dialog");
      console.error(error);
    }
  };

  const handleSaveFile = async () => {
    try {
      const filePath = await save({
        filters: [
          {
            name: "Text Files",
            extensions: ["txt"],
          },
          {
            name: "All Files",
            extensions: ["*"],
          },
        ],
        defaultPath: "document.txt",
      });
      if (filePath) {
        setResult(`Save location: ${filePath}`);
        showStatus("✓ Save location selected");
      } else {
        setResult("Save cancelled");
        showStatus("✗ Save cancelled");
      }
    } catch (error) {
      showStatus("✗ Error opening save dialog");
      console.error(error);
    }
  };

  const handleMessageDialog = async () => {
    try {
      await message("This is an informational message from Tauri!", {
        title: "Information",
        kind: "info",
      });
      showStatus("✓ Message shown");
    } catch (error) {
      showStatus("✗ Error showing message");
      console.error(error);
    }
  };

  const handleConfirmDialog = async () => {
    try {
      const confirmed = await confirm(
        "Do you want to proceed with this action?",
        { title: "Confirm Action", kind: "warning" }
      );
      setResult(`User response: ${confirmed ? "Confirmed" : "Cancelled"}`);
      showStatus(confirmed ? "✓ User confirmed" : "✗ User cancelled");
    } catch (error) {
      showStatus("✗ Error showing confirm dialog");
      console.error(error);
    }
  };

  const handleAskDialog = async () => {
    try {
      const answer = await ask(
        "Are you sure you want to delete this item? This action cannot be undone.",
        { title: "Delete Confirmation", kind: "warning" }
      );
      setResult(`User response: ${answer ? "Yes" : "No"}`);
      showStatus(answer ? "✓ User said Yes" : "✗ User said No");
    } catch (error) {
      showStatus("✗ Error showing ask dialog");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <MessageSquare className="w-10 h-10 text-gray-700 dark:text-gray-300" />
          Dialog
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Open file, save, and message dialogs
        </p>
      </header>

      {status && (
        <div className="mb-6 p-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 flex items-center gap-2">
          {status.includes("✓") ? <CheckCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" /> : <XCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />}
          {status}
        </div>
      )}

      <div className="space-y-6">
        {/* File Dialogs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            File & Directory Dialogs
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleOpenFile}
              className="px-4 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-medium rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Open File
            </button>
            <button
              onClick={handleOpenMultiple}
              className="px-4 py-3 bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 text-white font-medium rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <Files className="w-4 h-4" />
              Open Multiple Files
            </button>
            <button
              onClick={handleOpenDirectory}
              className="px-4 py-3 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-400 text-white font-medium rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <FolderOpen className="w-4 h-4" />
              Open Directory
            </button>
            <button
              onClick={handleSaveFile}
              className="px-4 py-3 bg-gray-500 hover:bg-gray-600 dark:bg-gray-400 dark:hover:bg-gray-300 text-white dark:text-gray-900 font-medium rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save File
            </button>
          </div>
        </div>

        {/* Message Dialogs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Message Dialogs
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={handleMessageDialog}
              className="px-4 py-3 bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 text-white font-medium rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <Info className="w-4 h-4" />
              Info Message
            </button>
            <button
              onClick={handleConfirmDialog}
              className="px-4 py-3 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-400 text-white font-medium rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              Confirm Dialog
            </button>
            <button
              onClick={handleAskDialog}
              className="px-4 py-3 bg-gray-500 hover:bg-gray-600 dark:bg-gray-400 dark:hover:bg-gray-300 text-white dark:text-gray-900 font-medium rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              Ask Dialog
            </button>
          </div>
        </div>

        {/* Result Display */}
        {result && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Result</h3>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-md text-gray-900 dark:text-white font-mono text-sm whitespace-pre-wrap break-all">
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
              <span className="text-gray-900 dark:text-white">open()</span> - Open file picker
              dialog
            </div>
            <div>
              <span className="text-gray-900 dark:text-white">save()</span> - Open save file
              dialog
            </div>
            <div>
              <span className="text-gray-900 dark:text-white">message()</span> - Show info
              message
            </div>
            <div>
              <span className="text-gray-900 dark:text-white">confirm()</span> - Show
              confirmation dialog
            </div>
            <div>
              <span className="text-gray-900 dark:text-white">ask()</span> - Show yes/no question
              dialog
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

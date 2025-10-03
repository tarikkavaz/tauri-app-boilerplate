"use client";

import { useState, useEffect } from "react";
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/plugin-notification";
import { 
  Bell, RefreshCw, Info, CheckCircle, AlertTriangle, 
  XCircle, Check, X 
} from "lucide-react";

export default function NotificationsPage() {
  const [status, setStatus] = useState("");
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const [title, setTitle] = useState("Tauri Notification");
  const [body, setBody] = useState("This is a test notification from your Tauri app!");

  useEffect(() => {
    checkPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showStatus = (msg: string) => {
    setStatus(msg);
    setTimeout(() => setStatus(""), 3000);
  };

  const checkPermission = async () => {
    try {
      const granted = await isPermissionGranted();
      setPermissionGranted(granted);
      if (granted) {
        showStatus("✓ Permission already granted");
      } else {
        showStatus("⚠️ Permission not granted yet");
      }
    } catch (error) {
      showStatus("✗ Error checking permission");
      console.error(error);
    }
  };

  const handleRequestPermission = async () => {
    try {
      const result = await requestPermission();
      const granted = result === "granted";
      setPermissionGranted(granted);
      showStatus(granted ? "✓ Permission granted" : "✗ Permission denied");
    } catch (error) {
      showStatus("✗ Error requesting permission");
      console.error(error);
    }
  };

  const handleSendBasicNotification = async () => {
    if (!permissionGranted) {
      showStatus("✗ Permission not granted");
      return;
    }
    try {
      sendNotification({ title, body });
      showStatus("✓ Notification sent");
    } catch (error) {
      showStatus("✗ Error sending notification");
      console.error(error);
    }
  };

  const handleSendInfoNotification = async () => {
    if (!permissionGranted) {
      showStatus("✗ Permission not granted");
      return;
    }
    try {
      sendNotification({
        title: "Information",
        body: "This is an informational notification",
      });
      showStatus("✓ Info notification sent");
    } catch (error) {
      showStatus("✗ Error sending notification");
      console.error(error);
    }
  };

  const handleSendSuccessNotification = async () => {
    if (!permissionGranted) {
      showStatus("✗ Permission not granted");
      return;
    }
    try {
      sendNotification({
        title: "Success!",
        body: "Your operation completed successfully",
      });
      showStatus("✓ Success notification sent");
    } catch (error) {
      showStatus("✗ Error sending notification");
      console.error(error);
    }
  };

  const handleSendWarningNotification = async () => {
    if (!permissionGranted) {
      showStatus("✗ Permission not granted");
      return;
    }
    try {
      sendNotification({
        title: "Warning",
        body: "Something requires your attention",
      });
      showStatus("✓ Warning notification sent");
    } catch (error) {
      showStatus("✗ Error sending notification");
      console.error(error);
    }
  };

  const handleSendErrorNotification = async () => {
    if (!permissionGranted) {
      showStatus("✗ Permission not granted");
      return;
    }
    try {
      sendNotification({
        title: "Error",
        body: "An error has occurred in the application",
      });
      showStatus("✓ Error notification sent");
    } catch (error) {
      showStatus("✗ Error sending notification");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <Bell className="w-10 h-10 text-gray-700 dark:text-gray-300" />
          Notifications
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Send native system notifications</p>
      </header>

      {status && (
        <div className="mb-6 p-3 bg-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 flex items-center gap-2">
          {status.includes("✓") ? <CheckCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" /> : status.includes("⚠️") ? <AlertTriangle className="w-4 h-4 text-gray-500 dark:text-gray-400" /> : <XCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />}
          {status}
        </div>
      )}

      <div className="space-y-6">
        {/* Permission Status */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Permission Status
          </h2>
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                permissionGranted === null
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-700"
                  : permissionGranted
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-900"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700"
              }`}
            >
              {permissionGranted === null ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Checking...
                </>
              ) : permissionGranted ? (
                <>
                  <Check className="w-4 h-4" />
                  Permission Granted
                </>
              ) : (
                <>
                  <X className="w-4 h-4" />
                  Permission Not Granted
                </>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={checkPermission}
              className="px-4 py-3 bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 text-white font-medium rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Check Permission
            </button>
            <button
              onClick={handleRequestPermission}
              className="px-4 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-medium rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={permissionGranted === true}
            >
              <Bell className="w-4 h-4" />
              Request Permission
            </button>
          </div>
        </div>

        {/* Custom Notification */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Custom Notification
          </h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500 focus:border-gray-400 dark:focus:border-gray-500"
                placeholder="Notification title..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Body
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-500 focus:border-gray-400 dark:focus:border-gray-500 min-h-[100px]"
                placeholder="Notification body..."
              />
            </div>
            <button
              onClick={handleSendBasicNotification}
              className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={!permissionGranted}
            >
              <Bell className="w-4 h-4" />
              Send Custom Notification
            </button>
          </div>
        </div>

        {/* Preset Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Preset Notifications
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleSendInfoNotification}
              className="px-4 py-3 bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={!permissionGranted}
            >
              <Info className="w-4 h-4" />
              Send Info
            </button>
            <button
              onClick={handleSendSuccessNotification}
              className="px-4 py-3 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-400 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={!permissionGranted}
            >
              <CheckCircle className="w-4 h-4" />
              Send Success
            </button>
            <button
              onClick={handleSendWarningNotification}
              className="px-4 py-3 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-400 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={!permissionGranted}
            >
              <AlertTriangle className="w-4 h-4" />
              Send Warning
            </button>
            <button
              onClick={handleSendErrorNotification}
              className="px-4 py-3 bg-gray-500 hover:bg-gray-600 dark:bg-gray-400 dark:hover:bg-gray-300 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={!permissionGranted}
            >
              <XCircle className="w-4 h-4" />
              Send Error
            </button>
          </div>
        </div>

        {/* API Reference */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Available Functions
          </h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-400 text-sm font-mono">
            <div>
              <span className="text-gray-900">isPermissionGranted()</span> -
              Check if permission is granted
            </div>
            <div>
              <span className="text-gray-900">requestPermission()</span> -
              Request notification permission
            </div>
            <div>
              <span className="text-gray-900">sendNotification()</span> - Send
              a notification with title and body
            </div>
          </div>
          <div className="mt-4 p-3 bg-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 text-sm">
            <strong>Note:</strong> Notifications appear in your system&apos;s
            notification center. On macOS, they&apos;ll appear in the top-right
            corner.
          </div>
        </div>
      </div>
    </div>
  );
}

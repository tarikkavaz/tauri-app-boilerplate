"use client";

import { useState, useEffect } from "react";
import {
  platform,
  version,
  type as osType,
  arch,
  family,
  hostname,
  locale,
} from "@tauri-apps/plugin-os";
import { 
  Monitor, Laptop, RefreshCw, Cpu, HardDrive, 
  Network, Globe, CheckCircle, XCircle 
} from "lucide-react";

interface OSInfo {
  platform: string;
  version: string;
  type: string;
  arch: string;
  family: string;
  hostname: string | null;
  locale: string | null;
}

export default function OSInfoPage() {
  const [status, setStatus] = useState("");
  const [osInfo, setOsInfo] = useState<OSInfo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showStatus = (msg: string) => {
    setStatus(msg);
    setTimeout(() => setStatus(""), 3000);
  };

  const fetchAllInfo = async () => {
    setLoading(true);
    try {
      const info: OSInfo = {
        platform: await platform(),
        version: await version(),
        type: await osType(),
        arch: await arch(),
        family: await family(),
        hostname: await hostname(),
        locale: await locale(),
      };
      setOsInfo(info);
      showStatus("✓ System information loaded");
    } catch (error) {
      showStatus("✗ Error fetching system information");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getOSIcon = () => {
    if (!osInfo) return Monitor;
    const plat = osInfo.platform.toLowerCase();
    if (plat.includes("darwin") || plat.includes("macos")) return Laptop;
    if (plat.includes("windows")) return Monitor;
    if (plat.includes("linux")) return Monitor;
    return Monitor;
  };

  const InfoCard = ({ label, value, Icon }: { label: string; value: string; Icon: React.ComponentType<{ className?: string }> }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</h3>
      </div>
      <p className="text-lg font-semibold text-gray-900 dark:text-white break-all">{value}</p>
    </div>
  );

  const OSIcon = getOSIcon();

  return (
    <div className="max-w-4xl mx-auto p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <OSIcon className="w-10 h-10 text-gray-700 dark:text-gray-300" />
          OS Information
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Get system and platform information</p>
      </header>

      {status && (
        <div className="mb-6 p-3 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 flex items-center gap-2">
          {status.includes("✓") ? <CheckCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" /> : <XCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />}
          {status}
        </div>
      )}

      <div className="space-y-6">
        {/* Refresh Button */}
        <div className="flex justify-end">
          <button
            onClick={fetchAllInfo}
            disabled={loading}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Refresh Information
              </>
            )}
          </button>
        </div>

        {/* OS Information Grid */}
        {osInfo && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard label="Platform" value={osInfo.platform} Icon={Monitor} />
            <InfoCard label="Version" value={osInfo.version} Icon={HardDrive} />
            <InfoCard label="OS Type" value={osInfo.type} Icon={Monitor} />
            <InfoCard label="Architecture" value={osInfo.arch} Icon={Cpu} />
            <InfoCard label="Family" value={osInfo.family} Icon={Laptop} />
            {osInfo.hostname && (
              <InfoCard label="Hostname" value={osInfo.hostname} Icon={Network} />
            )}
            {osInfo.locale && (
              <InfoCard label="Locale" value={osInfo.locale} Icon={Globe} />
            )}
          </div>
        )}

        {/* System Summary */}
        {osInfo && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">System Summary</h2>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <p>
                You are running <strong className="text-gray-900 dark:text-white">{osInfo.type}</strong> on a{" "}
                <strong className="text-gray-900 dark:text-white">{osInfo.platform}</strong> platform with{" "}
                <strong className="text-gray-900 dark:text-white">{osInfo.arch}</strong> architecture.
              </p>
              <p>
                OS Version: <strong className="text-gray-900 dark:text-white">{osInfo.version}</strong>
              </p>
              <p>
                System Family: <strong className="text-gray-900 dark:text-white">{osInfo.family}</strong>
              </p>
              {osInfo.hostname && (
                <p>
                  Device Name: <strong className="text-gray-900 dark:text-white">{osInfo.hostname}</strong>
                </p>
              )}
              {osInfo.locale && (
                <p>
                  System Locale: <strong className="text-gray-900 dark:text-white">{osInfo.locale}</strong>
                </p>
              )}
            </div>
          </div>
        )}

        {/* API Reference */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Available Functions</h3>
          <div className="space-y-2 text-gray-600 dark:text-gray-400 text-sm font-mono">
            <div>
              <span className="text-gray-900">platform()</span> - Get the operating system
              platform
            </div>
            <div>
              <span className="text-gray-900">version()</span> - Get the operating system
              version
            </div>
            <div>
              <span className="text-gray-900">type()</span> - Get the operating system type
            </div>
            <div>
              <span className="text-gray-900">arch()</span> - Get the CPU architecture
            </div>
            <div>
              <span className="text-gray-900">family()</span> - Get the operating system
              family
            </div>
            <div>
              <span className="text-gray-900">hostname()</span> - Get the system hostname
            </div>
            <div>
              <span className="text-gray-900">locale()</span> - Get the system locale
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

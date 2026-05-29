import React, { useMemo } from "react";
import { 
  Database, 
  Trash2, 
  ArrowLeftRight, 
  Clock, 
  FileCheck, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  Bookmark
} from "lucide-react";
import { SavedLog, Severity } from "../types";

interface RecentLogsProps {
  logs: SavedLog[];
  onLoadLog: (log: SavedLog) => void;
  onDeleteLog: (id: string) => void;
  onClearLogs: () => void;
}

export default function RecentLogs({ logs, onLoadLog, onDeleteLog, onClearLogs }: RecentLogsProps) {
  
  // Calculate handy metrics for the reviewer dashboard
  const metrics = useMemo(() => {
    const total = logs.length;
    let highSeverity = 0;
    let mdSeverity = 0;
    let lowSeverity = 0;
    const languages: Record<string, number> = {};
    const channels: Record<string, number> = {};

    logs.forEach((log) => {
      if (log.formData.severity === "High") highSeverity++;
      if (log.formData.severity === "Medium") mdSeverity++;
      if (log.formData.severity === "Low") lowSeverity++;

      languages[log.formData.language] = (languages[log.formData.language] || 0) + 1;
      channels[log.formData.channel] = (channels[log.formData.channel] || 0) + 1;
    });

    return {
      total,
      highSeverity,
      mdSeverity,
      lowSeverity,
      languages,
      channels
    };
  }, [logs]);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col gap-6" id="reviewer-history-block">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">Shipment Delay Incident History</h2>
            <p className="text-xs text-slate-400">Reviewer Audit Panel & saved delay logs</p>
          </div>
        </div>

        {logs.length > 0 && (
          <button
            onClick={onClearLogs}
            className="px-3 py-1.5 text-xs text-rose-600 hover:text-white border border-rose-200 hover:bg-rose-600 font-semibold rounded-xl transition-all cursor-pointer"
          >
            Clear All History
          </button>
        )}
      </div>

      {logs.length === 0 ? (
        <div className="py-12 border-2 border-dashed border-slate-100 rounded-2xl flex flex-col items-center justify-center text-center px-4">
          <Bookmark className="w-8 h-8 text-slate-300 mb-3 animate-bounce" />
          <p className="text-sm font-medium text-slate-700">No generated logs available yet</p>
          <p className="text-xs text-slate-400 max-w-xs mt-1">
            Complete the operational form above and hit generate to populate this secure history storage!
          </p>
        </div>
      ) : (
        <>
          {/* Dashboard Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" id="logistics-metrics-grid">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-1">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Total Delayed Incidents</span>
              <span className="text-2xl font-extrabold text-slate-800">{metrics.total}</span>
              <span className="text-[9px] text-indigo-600 font-medium">Auto-Persisted Locally</span>
            </div>

            <div className="p-4 bg-rose-50/55 rounded-xl border border-rose-100/50 flex flex-col gap-1">
              <span className="text-[10px] font-mono text-rose-600 font-bold uppercase">High Severity Alarms</span>
              <span className="text-2xl font-extrabold text-rose-700">{metrics.highSeverity}</span>
              <span className="text-[9px] text-rose-500 font-medium">Requires immediate monitoring</span>
            </div>

            <div className="p-4 bg-amber-50/55 rounded-xl border border-amber-100/50 flex flex-col gap-1">
              <span className="text-[10px] font-mono text-amber-600 font-bold uppercase">Med/Low Backlogs</span>
              <span className="text-2xl font-extrabold text-amber-700">{metrics.mdSeverity + metrics.lowSeverity}</span>
              <span className="text-[9px] text-amber-500 font-medium">Standard queue resolution</span>
            </div>

            <div className="p-4 bg-indigo-50/40 rounded-xl border border-indigo-100/40 flex flex-col gap-1">
              <span className="text-[10px] font-mono text-indigo-600 font-bold uppercase">Languages Used</span>
              <div className="flex gap-2 items-center mt-1 text-[11px] font-bold text-slate-700">
                {Object.entries(metrics.languages).map(([lang, count]) => (
                  <span key={lang} className="bg-white px-1.5 py-0.5 rounded-md border border-slate-200/60">
                    {lang[0]}:{count}
                  </span>
                ))}
              </div>
              <span className="text-[9px] text-slate-400 font-medium">Language versatility score</span>
            </div>
          </div>

          {/* Logs List */}
          <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-1" id="saved-logs-list">
            {logs.map((log) => {
              const severityColors: Record<Severity, string> = {
                Low: "bg-emerald-50 text-emerald-700 border-emerald-100",
                Medium: "bg-amber-50 text-amber-700 border-amber-100",
                High: "bg-rose-50 text-rose-700 border-rose-100"
              };

              return (
                <div
                  key={log.id}
                  className="p-4 bg-white border border-slate-150 hover:bg-slate-50/50 rounded-xl transition-all flex flex-col gap-3 group relative"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-800 text-sm">
                          {log.formData.customerName}
                        </span>
                        {log.formData.orderID && (
                          <span className="font-mono text-slate-400 text-xs px-1.5 py-0.5 bg-slate-100 rounded-md">
                            {log.formData.orderID}
                          </span>
                        )}
                        <span className={`text-[10px] px-2 py-0.5 font-bold rounded-full border ${severityColors[log.formData.severity]}`}>
                          {log.formData.severity} Severity
                        </span>
                      </div>
                      <span className="text-[10px] font-medium text-slate-400">
                        Incident Logged: {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 z-10 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onLoadLog(log)}
                        title="Load into Workbench"
                        className="p-1.5 bg-indigo-50 hover:bg-indigo-600 hover:text-white rounded-lg text-indigo-600 transition-all cursor-pointer"
                      >
                        <ArrowLeftRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteLog(log.id)}
                        title="Delete log"
                        className="p-1.5 bg-rose-50 hover:bg-rose-600 hover:text-white rounded-lg text-rose-600 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Delay statement teaser */}
                  <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-medium">
                    <span className="font-semibold text-slate-400">Delayed due to:</span>{" "}
                    {log.formData.delayReason}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <span>Timeline: <strong className="text-slate-700">{log.formData.updatedTimeline || "We will share soon"}</strong></span>
                    <span className="bg-slate-100/80 text-slate-500 px-2 py-0.5 rounded-md text-[10px]">
                      {log.formData.language} • {log.formData.channel} Primary
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

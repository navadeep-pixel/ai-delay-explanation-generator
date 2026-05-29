import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Copy, 
  Check, 
  Mail, 
  MessageSquare, 
  MessageCircle, 
  Edit3, 
  Eye, 
  FileText,
  Clock,
  AlertTriangle,
  Flame,
  Globe
} from "lucide-react";
import { GeneratedOutput, Channel, Tone, DelayFormData } from "../types";
import NotificationPreview from "./NotificationPreview";

interface GeneratedOutputProps {
  generated: GeneratedOutput;
  formData: DelayFormData;
  onEdit: (channel: Channel, tone: Tone, newText: string) => void;
}

export default function GeneratedOutputBlock({ generated, formData, onEdit }: GeneratedOutputProps) {
  const [activeChannel, setActiveChannel] = useState<Channel>("Email");
  const [activeTone, setActiveTone] = useState<Tone>("Formal");
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<"edit" | "preview">("preview");

  // Keep active channel in sync with initial launch channel selected in form
  useEffect(() => {
    setActiveChannel(formData.channel);
  }, [formData.channel]);

  const currentText = generated[activeChannel.toLowerCase() as "email" | "sms" | "whatsapp"][activeTone.toLowerCase() as "formal" | "friendly"];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const textLength = currentText.length;
  const wordCount = currentText.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden h-full" id="generated-workspace">
      {/* Header Tabs for Channels */}
      <div className="bg-slate-50 border-b border-slate-100 px-6 pt-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-indigo-500" />
              Response Workbench ({formData.language})
            </span>
            <div className="flex gap-1.5 p-0.5 bg-slate-200/60 rounded-lg text-xs">
              <button
                onClick={() => setViewMode("preview")}
                className={`px-3 py-1 rounded-md font-medium flex items-center gap-1 cursor-pointer transition-all ${
                  viewMode === "preview" ? "bg-white text-slate-800 shadow-xs" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Eye className="w-3 h-3" />
                Live Preview
              </button>
              <button
                onClick={() => setViewMode("edit")}
                className={`px-3 py-1 rounded-md font-medium flex items-center gap-1 cursor-pointer transition-all ${
                  viewMode === "edit" ? "bg-white text-slate-800 shadow-xs" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Edit3 className="w-3 h-3" />
                Fine-Tune Editor
              </button>
            </div>
          </div>

          <div className="flex border-b border-slate-200/60 gap-1 mt-1">
            {(["Email", "SMS", "WhatsApp"] as Channel[]).map((chan) => {
              const isActive = activeChannel === chan;
              const icons = {
                Email: <Mail className="w-4 h-4" />,
                SMS: <MessageSquare className="w-4 h-4" />,
                WhatsApp: <MessageCircle className="w-4 h-4" />
              };
              return (
                <button
                  key={chan}
                  onClick={() => {
                    setActiveChannel(chan);
                    setCopied(false);
                  }}
                  className={`px-4 py-3 text-xs font-semibold flex items-center gap-2 border-b-2 cursor-pointer transition-all ${
                    isActive
                      ? "border-indigo-600 text-indigo-600 font-bold"
                      : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
                  }`}
                >
                  {icons[chan]}
                  {chan}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Operational Options Pane (Tone selection) */}
      <div className="px-6 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-1">
          {(["Formal", "Friendly"] as Tone[]).map((t) => {
            const isActive = activeTone === t;
            return (
              <button
                key={t}
                onClick={() => {
                  setActiveTone(t);
                  setCopied(false);
                }}
                className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-all ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {t} Tone
              </button>
            );
          })}
        </div>

        {/* Copy Button */}
        <motion.button
          onClick={handleCopy}
          id="copy-to-clipboard-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
            copied 
              ? "bg-emerald-500 text-white" 
              : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Content Copied!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy Output Code
            </>
          )}
        </motion.button>
      </div>

      {/* Live Workspace Area */}
      <div className="flex-1 p-6 flex flex-col gap-4 bg-slate-50/20">
        <AnimatePresence mode="wait">
          {viewMode === "edit" ? (
            <motion.div
              key="edit-pane"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex-1 flex flex-col gap-2"
            >
              <div className="relative flex-1 flex flex-col">
                <textarea
                  value={currentText}
                  id="editable-output-textarea"
                  onChange={(e) => onEdit(activeChannel, activeTone, e.target.value)}
                  className="w-full flex-1 min-h-[300px] text-sm font-mono p-4 bg-slate-900 text-slate-100 rounded-xl leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-inner"
                />
              </div>

              {/* Status and limits */}
              <div className="flex items-center justify-between text-xs font-mono px-1">
                <span className="text-slate-500">
                  {wordCount} words • {textLength} characters
                </span>
                {activeChannel === "SMS" && (
                  <span className={`font-semibold ${textLength <= 160 ? "text-emerald-600" : "text-rose-600 animate-pulse"}`}>
                    {textLength <= 160 ? "✓ Under 160 character SMS limit" : `⚠️ Warn: ${textLength - 160} chars over SMS standard limit`}
                  </span>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="preview-pane"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex-1 flex flex-col"
            >
              {/* Interactive Visual Simulator Mock */}
              <NotificationPreview 
                channel={activeChannel} 
                tone={activeTone} 
                content={currentText} 
                formData={formData} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-1 font-medium">
          <Clock className="w-3 h-3 text-indigo-500" />
          <span>Polite, Empathetic and Reassuring Template</span>
        </div>
        <div className="flex items-center gap-1 font-medium">
          <AlertTriangle className="w-3 h-3 text-amber-500" />
          <span>Never Customer-Blaming</span>
        </div>
      </div>
    </div>
  );
}

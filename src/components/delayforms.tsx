import React from "react";
import { motion } from "motion/react";
import { 
  User, 
  Hash, 
  Clock, 
  Languages, 
  Sparkles, 
  AlertTriangle, 
  Mail, 
  MessageSquare, 
  MessageCircle, 
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { DelayFormData, Severity, Language, Channel } from "../types";

interface DelayFormProps {
  formData: DelayFormData;
  onChange: (data: DelayFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const PRESETS = [
  {
    title: "🌧️ Weather Flooding",
    reason: "heavy rainfall and severe flooding affecting major highway transportation routes in your delivery region",
    timeline: "2-3 business days",
    severity: "High" as Severity,
  },
  {
    title: "🛂 Customs Hold",
    reason: "unexpected security inspection holds and backlog processing at the international customs terminal hub",
    timeline: "1-2 business days",
    severity: "Medium" as Severity,
  },
  {
    title: "⚙️ Sorter Malfunction",
    reason: "a transient sorting belt malfunction and mechanical glitch at our central regional hub",
    timeline: "24-48 hours",
    severity: "Low" as Severity,
  },
  {
    title: "✈️ Cargo Flight Cancel",
    reason: "cancellations of key aviation schedules due to severe atmospheric winds and airspace safety restrictions",
    timeline: "3-4 business days",
    severity: "High" as Severity,
  }
];

export default function DelayForm({ formData, onChange, onSubmit, loading }: DelayFormProps) {
  
  const applyPreset = (preset: typeof PRESETS[0]) => {
    onChange({
      ...formData,
      delayReason: preset.reason,
      updatedTimeline: preset.timeline,
      severity: preset.severity
    });
  };

  const updateField = (field: keyof DelayFormData, value: any) => {
    onChange({
      ...formData,
      [field]: value
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6" id="delay-form-container">
      {/* Preset Scenarios Header */}
      <div>
        <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
          Quick-Fill Preset Logistics Scenarios
        </h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {PRESETS.map((preset, index) => (
            <button
              key={index}
              type="button"
              id={`preset-btn-${index}`}
              onClick={() => applyPreset(preset)}
              className="text-left text-xs p-2.5 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all text-slate-700 bg-white shadow-2xs font-medium cursor-pointer"
            >
              <div className="font-semibold text-slate-800 mb-1">{preset.title}</div>
              <div className="text-[10px] text-slate-500 line-clamp-1">{preset.timeline} • {preset.severity}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-slate-100" />

      {/* Form Input fields */}
      <form onSubmit={onSubmit} className="flex flex-col gap-5" id="staff-entry-form">
        <h3 className="text-sm font-semibold text-slate-900 border-l-2 border-indigo-600 pl-2">
          Staff Operational Details
        </h3>

        {/* Name and Order ID Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              Customer Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              id="customer-name-input"
              value={formData.customerName}
              onChange={(e) => updateField("customerName", e.target.value)}
              placeholder="e.g. John Smith"
              className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-500 focus:bg-white transition-colors text-slate-800 font-medium"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              <Hash className="w-3.5 h-3.5 text-slate-400" />
              Order / Shipment ID
            </label>
            <input
              type="text"
              id="order-id-input"
              value={formData.orderID}
              onChange={(e) => updateField("orderID", e.target.value)}
              placeholder="e.g. ORD-45678"
              className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-500 focus:bg-white transition-colors text-slate-800 font-mono"
            />
          </div>
        </div>

        {/* Delay Reason */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-slate-400" />
            Delay Reason <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            id="delay-reason-textarea"
            rows={2}
            value={formData.delayReason}
            onChange={(e) => updateField("delayReason", e.target.value)}
            placeholder="e.g. heavy rainfall affecting transportation routes in the delivery area"
            className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-500 focus:bg-white transition-colors text-slate-800 resize-none font-medium leading-relaxed"
          />
          <div className="text-[10px] text-slate-400 flex justify-between">
            <span>Describe the objective bottleneck clear and simple.</span>
            <span>Do not place blame on the customer.</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            Updated Timeline (Optional)
          </label>
          <input
            type="text"
            id="updated-timeline-input"
            value={formData.updatedTimeline}
            onChange={(e) => updateField("updatedTimeline", e.target.value)}
            placeholder="e.g. 2-3 business days (Leave empty if unknown)"
            className="w-full text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-500 focus:bg-white transition-colors text-slate-800 font-medium"
          />
          <p className="text-[10px] text-slate-400">
            If left blank, it defaults automatically to <em>"We will share a revised delivery estimate shortly."</em>
          </p>
        </div>

        {/* Severity, Language and Channel row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Incident Severity */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">Severity Level</label>
            <div className="grid grid-cols-3 gap-2">
              {(["Low", "Medium", "High"] as Severity[]).map((level) => {
                const colors = {
                  Low: "border-emerald-200 text-emerald-800 hover:bg-emerald-50 active-bg-emerald-100",
                  Medium: "border-amber-200 text-amber-800 hover:bg-amber-50 active-bg-amber-100",
                  High: "border-rose-200 text-rose-800 hover:bg-rose-50 active-bg-rose-100"
                };
                const activeColors = {
                  Low: "bg-emerald-500 text-white border-emerald-500 ring-2 ring-emerald-100",
                  Medium: "bg-amber-500 text-white border-amber-500 ring-2 ring-amber-100",
                  High: "bg-rose-500 text-white border-rose-500 ring-2 ring-rose-100"
                };

                const isActive = formData.severity === level;

                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => updateField("severity", level)}
                    className={`px-3 py-2 text-xs font-semibold border rounded-xl transition-all cursor-pointer ${
                      isActive ? activeColors[level] : `bg-white ${colors[level]}`
                    }`}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
              <Languages className="w-3.5 h-3.5 text-slate-400" />
              Primary Output Language
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["English", "Hindi", "Telugu"] as Language[]).map((lang) => {
                const isActive = formData.language === lang;
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => updateField("language", lang)}
                    className={`px-2 py-2 text-xs font-semibold border rounded-xl transition-all cursor-pointer ${
                      isActive
                        ? "bg-slate-900 border-slate-900 text-white"
                        : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {lang === "English" && "🇬🇧 English"}
                    {lang === "Hindi" && "🇮🇳 Hindi"}
                    {lang === "Telugu" && "🇮🇳 Telugu"}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Target Communication Channel preset (guides layout preview priority) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700">Preferred Initial Launch Channel</label>
          <div className="grid grid-cols-3 gap-2">
            {(["Email", "SMS", "WhatsApp"] as Channel[]).map((chan) => {
              const isActive = formData.channel === chan;
              const icons = {
                Email: <Mail className="w-3.5 h-3.5" />,
                SMS: <MessageSquare className="w-3.5 h-3.5" />,
                WhatsApp: <MessageCircle className="w-3.5 h-3.5" />
              };
              return (
                <button
                  key={chan}
                  type="button"
                  onClick={() => updateField("channel", chan)}
                  className={`px-3 py-2.5 text-xs font-semibold border rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? "bg-indigo-600 border-indigo-600 text-white ring-2 ring-indigo-100"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {icons[chan]}
                  {chan}
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate Button */}
        <motion.button
          type="submit"
          id="generate-button"
          disabled={loading}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className={`w-full py-3 px-4 rounded-xl text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer ${
            loading 
              ? "bg-indigo-400 cursor-not-allowed" 
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              AI Generating Notifications...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              AI Generate Delay Explanations
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}

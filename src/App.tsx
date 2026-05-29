import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  History, 
  Sparkles, 
  HelpCircle,
  TrendingDown, 
  LogOut,
  AlertCircle,
  RefreshCw,
  Mail,
  ChevronRight,
  Database
} from "lucide-react";
import { DelayFormData, GeneratedOutput } from "./types";
import DelayForm from "./components/DelayForm";
import GeneratedOutputBlock from "./components/GeneratedOutput";
import RecentLogs from "./components/RecentLogs";

// Initial demo input matching sample
const INITIAL_FORM_STATE: DelayFormData = {
  customerName: "John Smith",
  orderID: "ORD-45678",
  delayReason: "Heavy rainfall affecting transportation routes in the delivery area",
  updatedTimeline: "2-3 business days",
  severity: "Medium",
  channel: "Email",
  language: "English"
};

// Initial gorgeous placeholder output on load so the interface looks incredible right away
const INITIAL_GENERATED_STATE: GeneratedOutput = {
  email: {
    formal: `Customer Delay Update

Dear John Smith,

We would like to inform you that your shipment/order has been delayed due to Heavy rainfall affecting transportation routes in the delivery area.

Our team is actively working to resolve the situation and ensure your package reaches you as soon as possible.

Updated Expected Delivery: 2-3 business days

We sincerely apologize for the inconvenience and appreciate your patience and understanding.

If you have any questions, please contact our support team.

Thank you for choosing our services.

Best Regards,
Customer Support Team`,
    friendly: `Customer Delay Update

Dear John Smith,

We wanted to quickly update you that your package has run into a brief delay! This is because heavy rainfall is currently affecting major transportation routes in your area.

Rest assured, our dedicated delivery team is on the move, keeping a close eye on your shipment to get it to your doorstep as safe and sound as possible!

Updated Expected Delivery: 2-3 business days

We're so sorry for this slight delay and truly appreciate your incredible patience. 

If you have any quick questions or need assistance, our support team is always absolute happy to help you.

Warmest Regards,
Customer Support Team`
  },
  sms: {
    formal: "Dear John Smith, ORD-45678 is delayed due to heavy rainfall on routes. Expected delivery: 2-3 business days. We apologize. Support: +1800-LOG-HELP",
    friendly: "Hi John Smith! Your order ORD-45678 is delayed a bit by rainfall in the area. Should arrive in 2-3 business days! Thanks for your understanding! 📦"
  },
  whatsapp: {
    formal: `*Customer Delay Update*

Dear *John Smith*,

We would like to inform you that your shipment *ORD-45678* has been delayed due to *Heavy rainfall affecting transportation routes*.

Updated Expected Delivery: *2-3 business days*

We sincerely apologize for the delay and appreciate your professional understanding. For help, contact customer support.`,
    friendly: `*Delivery Update* 📦🌧️

Hi *John Smith*!

We wanted to let you know that your order *ORD-45678* is running a bit late due to heavy rainfall in the delivery area. We're on it and monitoring it closely! 🚛

*Expected delivery:* 2-3 business days

Huge apologies for the wait, and thank you so much for being so patient with us! 🌟`
  }
};

export default function App() {
  const [formData, setFormData] = useState<DelayFormData>(INITIAL_FORM_STATE);
  const [generated, setGenerated] = useState<GeneratedOutput>(INITIAL_GENERATED_STATE);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  // Local storage lists for audits
  const [logs, setLogs] = useState<any[]>([]);

  // Load logs on mounting
  useEffect(() => {
    const cached = localStorage.getItem("shipment_delay_logs");
    if (cached) {
      try {
        setLogs(JSON.parse(cached));
      } catch (err) {
        console.error("Failed to parse logs from localStorage", err);
      }
    }
  }, []);

  // Set transient dismissible feedback alerts
  const showFeedback = (text: string, type: "success" | "error" = "success") => {
    setFeedback({ text, type });
    setTimeout(() => {
      setFeedback(null);
    }, 4500);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Internal Server Error during AI compilation.");
      }

      const outcomeData = (await response.json()) as GeneratedOutput;
      setGenerated(outcomeData);
      showFeedback("AI delay notification successfully generated!", "success");

      // Save into historical log
      const newLog = {
        id: "log_" + Date.now().toString(36),
        timestamp: new Date().toISOString(),
        formData: { ...formData },
        generated: outcomeData
      };

      const updatedLogs = [newLog, ...logs];
      setLogs(updatedLogs);
      localStorage.setItem("shipment_delay_logs", JSON.stringify(updatedLogs));

    } catch (err: any) {
      console.error(err);
      showFeedback(err.message || "Something went wrong. Please check dev credentials.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditOutputText = (channel: any, tone: any, newText: string) => {
    setGenerated(prev => {
      const chanKey = channel.toLowerCase() as "email" | "sms" | "whatsapp";
      const toneKey = tone.toLowerCase() as "formal" | "friendly";
      return {
        ...prev,
        [chanKey]: {
          ...prev[chanKey],
          [toneKey]: newText
        }
      };
    });
  };

  const loadLogIntoForm = (log: any) => {
    setFormData(log.formData);
    setGenerated(log.generated);
    showFeedback("Successfully loaded incident template into active workbench!", "success");
    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteLog = (id: string) => {
    const updated = logs.filter(l => l.id !== id);
    setLogs(updated);
    localStorage.setItem("shipment_delay_logs", JSON.stringify(updated));
    showFeedback("Incident log deleted.", "success");
  };

  const clearAllLogs = () => {
    setLogs([]);
    localStorage.removeItem("shipment_delay_logs");
    showFeedback("Log history purged successfully.", "success");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-indigo-500 selection:text-white antialiased font-sans flex flex-col">
      
      {/* Decorative Top Status Bar or Glowing Ambient Backdrops */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[250px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Corporate Logistic Header */}
      <nav className="bg-slate-900 border-b border-slate-800 shrink-0 sticky top-0 z-40 backdrop-blur-md bg-opacity-95" id="logistics-navigation-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/30">
                <Truck className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                  ShipmentDelay AI
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded-sm uppercase tracking-wide font-mono font-bold">
                    PRO v1.3
                  </span>
                </span>
                <span className="block text-[10px] text-slate-400 font-medium">Customer-Facing Notification Suite</span>
              </div>
            </div>

            {/* Support Metrics Teaser */}
            <div className="hidden md:flex items-center gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Auto-Persist Storage: Local</span>
              </div>
              <div className="h-4 w-px bg-slate-800" />
              <div className="flex items-center gap-1">
                <Database className="w-3.5 h-3.5 text-indigo-400" />
                <span>{logs.length} incident logs</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 z-10">
        
        {/* Dynamic dismissible feedback alert */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              id="global-toast-notification"
              className={`p-4 rounded-xl shadow-lg border text-sm flex items-start gap-3 relative z-50 ${
                feedback.type === "error"
                  ? "bg-rose-950/90 border-rose-800 text-rose-200"
                  : "bg-emerald-950/90 border-emerald-800 text-emerald-200"
              }`}
            >
              <div className={`p-1 rounded-md ${feedback.type === "error" ? "bg-rose-900" : "bg-emerald-900"}`}>
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="font-bold">{feedback.type === "error" ? "Operational Warning" : "Integration Sync"}</p>
                <p className="text-xs opacity-90 mt-0.5 font-medium">{feedback.text}</p>
              </div>
              <button
                onClick={() => setFeedback(null)}
                className="text-xs underline cursor-pointer hover:opacity-80 absolute top-4 right-4"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Introduction Dashboard Hero */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-slate-800/40 border border-slate-800 rounded-3xl" id="dashboard-hero-card">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl font-extrabold text-white tracking-tight sm:text-3xl">
              AI Delay Explanation Generator
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Empower your fleet dispatchers, support managers, and courier coordinators with instantly polished, polite, empathetic, and professional notification templates. Avoid customer frustration and maintain maximum loyalty during incident delays.
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 font-mono">
              Empathetic • Multi-lingual • Cross-channel
            </span>
          </div>
        </div>

        {/* Primary Interactive Workspace split screen */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.1fr] gap-6 items-start">
          
          {/* Left panel: Input parameters */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-indigo-500" />
                Operational Parameter Form
              </h2>
              <span className="text-xs text-slate-500 font-semibold">Inputs strictly bound by rules</span>
            </div>

            <DelayForm 
              formData={formData} 
              onChange={setFormData} 
              onSubmit={handleGenerate} 
              loading={loading} 
            />
          </div>

          {/* Right panel: Live Generated Workbenches */}
          <div className="flex flex-col gap-6 h-full">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                Generative AI Workbench
              </h2>
              <span className="text-xs text-slate-500 font-semibold font-mono">Model: Gemini 3.5 Flash</span>
            </div>

            <GeneratedOutputBlock 
              generated={generated} 
              formData={formData} 
              onEdit={handleEditOutputText} 
            />
          </div>

        </div>

        {/* Bottom Historical Incident Log Storage */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500" />
              Dispatcher Incident Audit History
            </h2>
            <span className="text-xs text-slate-500 font-medium">Auto-saves every generated outcome</span>
          </div>

          <RecentLogs 
            logs={logs} 
            onLoadLog={loadLogIntoForm} 
            onDeleteLog={deleteLog} 
            onClearLogs={clearAllLogs} 
          />
        </div>

      </main>

      {/* Compact Elegant Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs py-8 mt-auto shrink-0" id="application-system-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
            <span className="font-semibold text-white">AI Delay Explanation Generator</span>
            <span className="text-slate-600">|</span>
            <span>Production-ready Intern Prototype</span>
          </div>
          <div className="flex items-center gap-6 text-[11px] font-mono">
            <span>Powered by Gemini AI 3.5 Flash SDK</span>
            <span>Created at: May 2026</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

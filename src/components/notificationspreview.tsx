import React from "react";
import { 
  Mail, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  Check, 
  ChevronLeft, 
  Smartphone,
  Shield,
  Wifi,
  Battery,
  AlertCircle
} from "lucide-react";
import { Channel, Tone, DelayFormData } from "../types";

interface NotificationPreviewProps {
  channel: Channel;
  tone: Tone;
  content: string;
  formData: DelayFormData;
}

export default function NotificationPreview({ channel, tone, content, formData }: NotificationPreviewProps) {
  
  // Format content to render line-breaks properly
  const formatParagraphs = (text: string) => {
    return text.split("\n").map((para, i) => (
      <p key={i} className={para.trim() === "" ? "h-3" : "mb-2 text-slate-800 leading-relaxed font-medium"}>
        {para}
      </p>
    ));
  };

  if (channel === "Email") {
    return (
      <div className="flex-1 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[350px]" id="email-simulator">
        {/* Email Header Panel */}
        <div className="bg-slate-50 border-b border-slate-100 p-4 flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="ml-2 font-mono text-[10px]">LOGISTICS EMAIL CLIENT v1.2</span>
          </div>
          
          <div className="grid grid-cols-[60px_1fr] gap-x-2 text-xs text-slate-600">
            <span className="font-semibold text-slate-400">From:</span>
            <span className="font-medium text-slate-800">Customer Support Team &lt;support@shipment-relay.com&gt;</span>
            <span className="font-semibold text-slate-400">To:</span>
            <span className="font-medium text-slate-800">{formData.customerName || "Customer name"} &lt;recipient@example.com&gt;</span>
            <span className="font-semibold text-slate-400">Subject:</span>
            <span className="font-semibold text-indigo-600">⚠️ Customer Delay Update - {formData.orderID || "ORD-XXXXX"}</span>
          </div>
        </div>

        {/* Email Content Body */}
        <div className="flex-1 p-6 overflow-y-auto text-sm max-h-[350px] bg-slate-50/10 select-all">
          <div className="max-w-2xl mx-auto bg-white p-6 border border-slate-100 rounded-lg shadow-2xs font-sans">
            {formatParagraphs(content)}
          </div>
        </div>
      </div>
    );
  }

  if (channel === "SMS") {
    return (
      <div className="flex-1 flex justify-center py-4 bg-slate-900/5 rounded-xl border border-dashed border-slate-200" id="sms-simulator">
        <div className="w-[300px] bg-black rounded-[40px] p-2.5 shadow-xl border-4 border-slate-800 flex flex-col overflow-hidden relative">
          
          {/* iOS Status Bar */}
          <div className="px-5 pt-1 pb-1 flex justify-between items-center text-[10px] text-white/90 font-semibold z-10">
            <span>15:55</span>
            <div className="flex items-center gap-1">
              <Wifi className="w-3 h-3" />
              <Battery className="w-4 h-3" />
            </div>
          </div>

          {/* iOS SMS Contact Header */}
          <div className="border-b border-white/10 pb-2 flex items-center gap-2 pt-1">
            <button className="text-indigo-400 text-xs flex items-center cursor-pointer">
              <ChevronLeft className="w-5 h-5 -ml-1 text-indigo-400" />
            </button>
            <div className="flex-1 flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-slate-600 flex items-center justify-center text-white text-[11px] font-bold">
                CS
              </div>
              <span className="text-[10px] text-white/80 font-semibold mt-1">Cargo Support</span>
            </div>
            <MoreVertical className="w-4 h-4 text-white/50" />
          </div>

          {/* SMS Body Context */}
          <div className="flex-1 py-4 overflow-y-auto flex flex-col gap-2 min-h-[220px] max-h-[260px] scrollbar-thin">
            <span className="text-center text-[9px] text-white/40 my-1">Today at 15:55 PM</span>
            <div className="self-start max-w-[85%] bg-slate-800 text-slate-100 rounded-2xl px-3 py-2 text-[11px] leading-relaxed select-all">
              {content}
            </div>
            <div className="text-right pr-2">
              <span className="text-[9px] text-white/30 font-medium font-mono">Delivered</span>
            </div>
          </div>

          {/* iOS Keyboard/Input stub */}
          <div className="border-t border-white/10 pt-2 flex items-center gap-2">
            <div className="flex-1 bg-white/10 rounded-full px-3 py-1.5 text-[10px] text-white/40">
              iMessage
            </div>
            <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
              <Send className="w-3 h-3 text-white" />
            </div>
          </div>

        </div>
      </div>
    );
  }

  if (channel === "WhatsApp") {
    return (
      <div className="flex-1 flex justify-center py-4 bg-emerald-50/30 rounded-xl border border-dashed border-slate-200" id="whatsapp-simulator">
        <div className="w-[310px] bg-slate-900 rounded-[35px] p-2.5 shadow-xl border-4 border-slate-800 flex flex-col overflow-hidden relative">
          
          {/* Status bar */}
          <div className="px-5 pt-1 pb-1 flex justify-between items-center text-[10px] text-white/80 font-semibold">
            <span>15:55</span>
            <div className="flex items-center gap-1">
              <Wifi className="w-3 h-3" />
              <Battery className="w-4 h-3" />
            </div>
          </div>

          {/* WhatsApp Header style */}
          <div className="bg-[#075E54] -mx-2.5 px-3 py-2 flex items-center justify-between text-white border-b border-emerald-900 shadow-xs">
            <div className="flex items-center gap-1">
              <ChevronLeft className="w-5 h-5 -ml-1" />
              <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-xs">
                🚛
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold">Logistics Alert</span>
                <span className="text-[8px] text-emerald-100/80">Support Active</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-white/90">
              <Video className="w-3.5 h-3.5" />
              <Phone className="w-3.5 h-3.5" />
              <MoreVertical className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* WhatsApp chat background bubble */}
          <div className="flex-1 bg-[#efeae2] -mx-2.5 p-3 flex flex-col gap-2 min-h-[220px] max-h-[260px] overflow-y-auto">
            <span className="align-self-center self-center text-center text-[9px] bg-white/80 text-slate-500 rounded-md px-1.5 py-0.5 shadow-2xs">
              TODAY
            </span>
            <div className="self-start max-w-[90%] bg-white rounded-lg rounded-tl-none p-2.5 text-[11px] leading-relaxed text-slate-800 shadow-2xs relative select-all">
              {content.split("\n").map((line, idx) => (
                <div key={idx} className={line.trim() === "" ? "h-1.5" : "mb-0.5"}>
                  {line}
                </div>
              ))}
              <div className="text-right text-[8px] text-slate-400 mt-1 flex items-center justify-end gap-0.5">
                <span>15:55</span>
                <div className="flex">
                  <Check className="w-2.5 h-2.5 text-sky-500 -mr-1" />
                  <Check className="w-2.5 h-2.5 text-sky-500" />
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp footer bar text */}
          <div className="bg-[#f0f0f0] -mx-2.5 px-3 py-2 flex items-center gap-2 border-t border-slate-200">
            <div className="flex-1 bg-white rounded-full px-3.5 py-1 text-[9px] text-slate-400">
              Type a message
            </div>
            <div className="w-7 h-7 rounded-full bg-[#128C7E] flex items-center justify-center">
              <Send className="w-3 h-3 text-white" />
            </div>
          </div>

        </div>
      </div>
    );
  }

  return null;
}

export type Severity = "Low" | "Medium" | "High";
export type Language = "English" | "Hindi" | "Telugu";
export type Channel = "Email" | "SMS" | "WhatsApp";
export type Tone = "Formal" | "Friendly";

export interface DelayFormData {
  customerName: string;
  orderID: string;
  delayReason: string;
  updatedTimeline: string;
  severity: Severity;
  channel: Channel;
  language: Language;
}

export interface GeneratedChannelVersions {
  formal: string;
  friendly: string;
}

export interface GeneratedOutput {
  email: GeneratedChannelVersions;
  sms: GeneratedChannelVersions;
  whatsapp: GeneratedChannelVersions;
}

export interface SavedLog {
  id: string;
  timestamp: string;
  formData: DelayFormData;
  generated: GeneratedOutput;
}

type EventName = "cta_click" | "whatsapp_click" | "form_start" | "form_submit" | "cases_view";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: EventName, parameters: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, parameters);
  window.fbq?.("trackCustom", name, parameters);
}

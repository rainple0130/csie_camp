type AnalyticsValue = string | number | boolean;

type AnalyticsParams = Record<string, AnalyticsValue | undefined>;

type Gtag = (command: "event", eventName: string, params?: AnalyticsParams) => void;

export function trackEvent(eventName: string, params?: AnalyticsParams) {
  if (typeof window === "undefined") return;

  const gtag = (window as Window & { gtag?: Gtag }).gtag;
  if (!gtag) return;

  gtag("event", eventName, params);
}

// Meta Pixel event helpers. Every call is a safe no-op if the pixel script
// hasn't loaded (e.g. NEXT_PUBLIC_FB_PIXEL_ID unset, or ad blocker present),
// so these can be called freely from the checkout flow.

type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

export function track(event: string, params?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', event, params);
  }
}

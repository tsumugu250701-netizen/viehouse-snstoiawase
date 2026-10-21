export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
export const gaEnabled = /^G-[A-Z0-9]+$/.test(GA_ID);

export function trackEvent(name, parameters = {}) {
  if (!gaEnabled || typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  try { window.gtag('event', name, { ...parameters, send_to: GA_ID }); } catch {}
}

const ATTRIBUTION_STORAGE_KEY = 'myhumble_attribution';
const SESSION_STORAGE_KEY = 'myhumble_session_id';

type AttributionData = {
  first_visit_at?: string;
  landing_path?: string;
  landing_hash?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  msclkid?: string;
};

type TrackParams = Record<string, string | number | boolean | undefined>;

function getGaId() {
  return import.meta.env.VITE_GA4_MEASUREMENT_ID?.trim() || '';
}

function getClarityId() {
  return import.meta.env.VITE_CLARITY_PROJECT_ID?.trim() || '';
}

function isBrowser() {
  return typeof window !== 'undefined';
}

function createSessionId() {
  return `mh_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}

export function getSessionId() {
  if (!isBrowser()) return '';
  const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (existing) return existing;
  const created = createSessionId();
  window.sessionStorage.setItem(SESSION_STORAGE_KEY, created);
  return created;
}

export function getStoredAttribution(): AttributionData {
  if (!isBrowser()) return {};
  try {
    return JSON.parse(window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY) || '{}') as AttributionData;
  } catch {
    return {};
  }
}

export function captureAttribution() {
  if (!isBrowser()) return {};

  const url = new URL(window.location.href);
  const params = url.searchParams;
  const current: AttributionData = {
    first_visit_at: new Date().toISOString(),
    landing_path: url.pathname,
    landing_hash: url.hash || '',
    referrer: document.referrer || '',
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_term: params.get('utm_term') || undefined,
    utm_content: params.get('utm_content') || undefined,
    gclid: params.get('gclid') || undefined,
    fbclid: params.get('fbclid') || undefined,
    msclkid: params.get('msclkid') || undefined,
  };

  const previous = getStoredAttribution();
  const merged = {
    ...current,
    ...previous,
    ...Object.fromEntries(
      Object.entries(current).filter(([, value]) => value !== undefined && value !== ''),
    ),
  } satisfies AttributionData;

  window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(merged));
  return merged;
}

function injectGa() {
  const gaId = getGaId();
  if (!gaId || !isBrowser() || window.gtag) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', gaId, {
    send_page_view: false,
  });
}

function injectClarity() {
  const clarityId = getClarityId();
  if (!clarityId || !isBrowser() || window.clarity) return;

  const clarity = ((...args: unknown[]) => {
    clarity.q = clarity.q || [];
    clarity.q.push(args);
  }) as ((...args: unknown[]) => void) & { q?: unknown[][] };

  window.clarity = clarity;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${clarityId}`;
  document.head.appendChild(script);
}

export function initTracking() {
  if (!isBrowser()) return;
  captureAttribution();
  getSessionId();
  injectGa();
  injectClarity();
}

export function trackEvent(eventName: string, params: TrackParams = {}) {
  if (!isBrowser()) return;

  const cleanParams = Object.fromEntries(
    Object.entries({
      ...getStoredAttribution(),
      session_id: getSessionId(),
      ...params,
    }).filter(([, value]) => value !== undefined && value !== ''),
  );

  if (window.gtag) {
    window.gtag('event', eventName, cleanParams);
  }
}

export function trackPageView(pageName?: string) {
  if (!isBrowser()) return;

  const pagePath = `${window.location.pathname}${window.location.hash}`;
  const pageTitle = pageName || document.title;

  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageTitle,
      page_path: pagePath,
      session_id: getSessionId(),
      ...getStoredAttribution(),
    });
  }
}

export function buildTrackedStripeUrl(url: string, params: TrackParams = {}) {
  const trackedUrl = new URL(url);
  const attribution = getStoredAttribution();

  Object.entries(attribution).forEach(([key, value]) => {
    if (value && key.startsWith('utm_')) {
      trackedUrl.searchParams.set(key, value);
    }
  });

  trackedUrl.searchParams.set('client_reference_id', getSessionId());

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      trackedUrl.searchParams.set(key, String(value));
    }
  });

  return trackedUrl.toString();
}

import { track as trackVercelEvent } from '@vercel/analytics';

const ATTRIBUTION_STORAGE_KEY = 'myhumble_attribution';
const SESSION_STORAGE_KEY = 'myhumble_session_id';
const CONSENT_STORAGE_KEY = 'myhumble_consent_preferences';
export const APP_ROUTE_CHANGE_EVENT = 'myhumble:routechange';
const DEFAULT_GA4_MEASUREMENT_ID = 'G-L1LPXCC1P9';
const FORCE_ANALYTICS_ALWAYS_ON = true;

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

export type ConsentPreferences = {
  analytics: boolean;
  updatedAt: string;
};

type VirtualRouteOptions = {
  replace?: boolean;
};

function getGaId() {
  return import.meta.env.VITE_GA4_MEASUREMENT_ID?.trim() || DEFAULT_GA4_MEASUREMENT_ID;
}

function getClarityId() {
  return import.meta.env.VITE_CLARITY_PROJECT_ID?.trim() || '';
}

function isBrowser() {
  return typeof window !== 'undefined';
}

function normalizePath(path: string) {
  if (!path) return '/';
  return path.startsWith('/') ? path : `/${path}`;
}

function isGaDebugMode() {
  if (!isBrowser()) return false;
  const url = new URL(window.location.href);
  return url.searchParams.get('ga_debug') === '1' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
}

function hasForcedAnalyticsDebugConsent() {
  return FORCE_ANALYTICS_ALWAYS_ON || isGaDebugMode();
}

function getDefaultConsentPreferences(): ConsentPreferences {
  return {
    analytics: FORCE_ANALYTICS_ALWAYS_ON,
    updatedAt: '',
  };
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

export function getConsentPreferences(): ConsentPreferences {
  if (!isBrowser()) return getDefaultConsentPreferences();

  try {
    const parsed = JSON.parse(window.localStorage.getItem(CONSENT_STORAGE_KEY) || '{}') as Partial<ConsentPreferences>;
    return {
      analytics: Boolean(parsed.analytics),
      updatedAt: parsed.updatedAt || '',
    };
  } catch {
    return getDefaultConsentPreferences();
  }
}

export function hasConsentChoice() {
  if (!isBrowser()) return false;
  return Boolean(window.localStorage.getItem(CONSENT_STORAGE_KEY));
}

export function hasAnalyticsConsent() {
  return hasForcedAnalyticsDebugConsent() || getConsentPreferences().analytics;
}

export function setVirtualRoute(path: string, options: VirtualRouteOptions = {}) {
  if (!isBrowser()) return;

  const nextPath = normalizePath(path);
  const nextUrl = new URL(window.location.href);
  nextUrl.pathname = nextPath;
  nextUrl.search = '';
  nextUrl.hash = '';

  const currentRoute = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  const targetRoute = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;

  if (currentRoute === targetRoute) return;

  const historyMethod = options.replace ? 'replaceState' : 'pushState';
  window.history[historyMethod]({ ...window.history.state, myhumbleVirtualRoute: nextPath }, '', nextUrl);
  window.dispatchEvent(new Event(APP_ROUTE_CHANGE_EVENT));
}

function updateGoogleConsent(analyticsGranted: boolean) {
  if (!isBrowser() || !window.gtag) return;
}

function sendGooglePageConfig(pageTitle?: string) {
  if (!isBrowser() || !window.gtag) return;

  const gaId = getGaId();
  if (!gaId) return;

  window.gtag('config', gaId, {
    page_title: pageTitle || document.title,
    page_path: `${window.location.pathname}${window.location.search}${window.location.hash}`,
    page_location: window.location.href,
    send_page_view: true,
    debug_mode: isGaDebugMode(),
  });
}

export function setConsentPreferences(preferences: Pick<ConsentPreferences, 'analytics'>) {
  if (!isBrowser()) return;

  const nextPreferences: ConsentPreferences = {
    analytics: preferences.analytics,
    updatedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(nextPreferences));
  updateGoogleConsent(nextPreferences.analytics);

  if (nextPreferences.analytics) {
    sendGooglePageConfig();
    injectClarity();
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
  if (!gaId || !isBrowser()) return;

  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }
}

function injectClarity() {
  const clarityId = getClarityId();
  if (!clarityId || !isBrowser() || window.clarity || !hasAnalyticsConsent()) return;

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
  if (hasAnalyticsConsent()) {
    injectClarity();
  }
}

export function trackEvent(eventName: string, params: TrackParams = {}) {
  if (!isBrowser() || !hasAnalyticsConsent()) return;

  const cleanParams = Object.fromEntries(
    Object.entries({
      ...getStoredAttribution(),
      session_id: getSessionId(),
      debug_mode: isGaDebugMode(),
      ...params,
    }).filter(([, value]) => value !== undefined && value !== ''),
  );

  if (window.gtag) {
    window.gtag('event', eventName, cleanParams);
  }

  try {
    trackVercelEvent(eventName, cleanParams);
  } catch {
    // Ignore Vercel Analytics client errors so user flows are never blocked.
  }
}

export function trackPageView(pageName?: string) {
  if (!isBrowser() || !hasAnalyticsConsent()) return;

  const pagePath = `${window.location.pathname}${window.location.hash}`;
  const pageTitle = pageName || document.title;

  sendGooglePageConfig(pageTitle);

  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: pageTitle,
      page_path: pagePath,
      page_location: window.location.href,
      session_id: getSessionId(),
      debug_mode: isGaDebugMode(),
      ...getStoredAttribution(),
    });
  }
}

export function triggerInitialAnalyticsHit(pageName?: string) {
  if (!isBrowser() || !hasAnalyticsConsent()) return;

  window.setTimeout(() => {
    if (!hasAnalyticsConsent()) return;

    const pageTitle = pageName || document.title;
    sendGooglePageConfig(pageTitle);

    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: pageTitle,
        page_path: `${window.location.pathname}${window.location.hash}`,
        page_location: window.location.href,
        session_id: getSessionId(),
        debug_mode: isGaDebugMode(),
        ...getStoredAttribution(),
      });

      window.gtag('event', 'analytics_test_hit', {
        source: 'consent_accept',
        session_id: getSessionId(),
        debug_mode: isGaDebugMode(),
        ...getStoredAttribution(),
      });
    }
  }, 800);
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

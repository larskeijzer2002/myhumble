const ATTRIBUTION_STORAGE_KEY = 'myhumble_attribution';
const SESSION_STORAGE_KEY = 'myhumble_session_id';
const CONSENT_STORAGE_KEY = 'myhumble_consent_preferences';
export const APP_ROUTE_CHANGE_EVENT = 'myhumble:routechange';
const FORCE_ANALYTICS_ALWAYS_ON = false;

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

type ClarityConsentState = 'granted' | 'denied';

function isBrowser() {
  return typeof window !== 'undefined';
}

function ensureDataLayer() {
  if (!isBrowser()) return [];
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

function normalizePath(path: string) {
  if (!path) return '/';
  return path.startsWith('/') ? path : `/${path}`;
}

function normalizeClarityPageId(path: string) {
  return normalizePath(path).replace(/[^\w/-]+/g, '-');
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

function updateClarityConsent(analyticsGranted: boolean) {
  if (!isBrowser() || typeof window.clarity !== 'function') return;

  const consentState: ClarityConsentState = analyticsGranted ? 'granted' : 'denied';

  window.clarity('consentv2', {
    ad_Storage: consentState,
    analytics_Storage: consentState,
  });
}

export function syncClarityPageContext(pageName?: string) {
  if (!isBrowser() || typeof window.clarity !== 'function') return;

  const pagePath = `${window.location.pathname}${window.location.hash}`;
  const pageId = normalizeClarityPageId(pagePath);
  const sessionId = getSessionId();
  const friendlyName = pageName || document.title || pagePath;

  // Give Clarity explicit page/session context for SPA route changes.
  window.clarity('identify', sessionId, sessionId, pageId, friendlyName);
  window.clarity('set', 'page_path', pagePath);
  window.clarity('set', 'page_title', friendlyName);
}

export function setConsentPreferences(preferences: Pick<ConsentPreferences, 'analytics'>) {
  if (!isBrowser()) return;

  const nextPreferences: ConsentPreferences = {
    analytics: preferences.analytics,
    updatedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(nextPreferences));
  updateClarityConsent(nextPreferences.analytics);
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

export function initTracking() {
  if (!isBrowser()) return;
  captureAttribution();
  getSessionId();
  updateClarityConsent(hasAnalyticsConsent());
  syncClarityPageContext();
}

export function pushDataLayerEvent(eventName: string, params: TrackParams = {}) {
  if (!isBrowser()) return;

  const payload = Object.fromEntries(
    Object.entries({
      event: eventName,
      session_id: getSessionId(),
      page_path: `${window.location.pathname}${window.location.hash}`,
      page_location: window.location.href,
      ...params,
    }).filter(([, value]) => value !== undefined && value !== ''),
  );

  ensureDataLayer().push(payload);
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

  pushDataLayerEvent(eventName, cleanParams);
}

export function trackPageView(pageName?: string) {
  if (!isBrowser() || !hasAnalyticsConsent()) return;

  const pagePath = `${window.location.pathname}${window.location.hash}`;
  const pageTitle = pageName || document.title;

  pushDataLayerEvent('myhumble_virtual_page_view', {
    page_title: pageTitle,
    page_path: pagePath,
    debug_mode: isGaDebugMode(),
    ...getStoredAttribution(),
  });
}

export function triggerInitialAnalyticsHit(pageName?: string) {
  if (!isBrowser() || !hasAnalyticsConsent()) return;

  window.setTimeout(() => {
    if (!hasAnalyticsConsent()) return;

    const pageTitle = pageName || document.title;
    pushDataLayerEvent('myhumble_virtual_page_view', {
      page_title: pageTitle,
      page_path: `${window.location.pathname}${window.location.hash}`,
      debug_mode: isGaDebugMode(),
      ...getStoredAttribution(),
    });
    pushDataLayerEvent('myhumble_analytics_test_hit', {
      source: 'consent_accept',
      debug_mode: isGaDebugMode(),
      ...getStoredAttribution(),
    });
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

(function initializeTrackingConsent() {
  var consentState = 'denied';

  try {
    var storedPreferences = JSON.parse(
      window.localStorage.getItem('myhumble_consent_preferences') || '{}',
    );
    consentState = storedPreferences.analytics === true ? 'granted' : 'denied';
  } catch (_error) {
    consentState = 'denied';
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: consentState,
    wait_for_update: 500,
  });

  window.clarity = window.clarity || function clarity() {
    (window.clarity.q = window.clarity.q || []).push(arguments);
  };
  window.clarity('consentv2', {
    ad_Storage: 'denied',
    analytics_Storage: consentState,
  });
})();

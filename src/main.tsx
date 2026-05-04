import React from 'react';
import ReactDOM from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Index from './index';
import './index.css';
import { APP_ROUTE_CHANGE_EVENT, initTracking } from './lib/tracking';

initTracking();

function useCurrentPath() {
  const [path, setPath] = React.useState(() =>
    typeof window === 'undefined' ? '/' : window.location.pathname,
  );

  React.useEffect(() => {
    function handleRouteChange() {
      setPath(window.location.pathname);
    }

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener(APP_ROUTE_CHANGE_EVENT, handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener(APP_ROUTE_CHANGE_EVENT, handleRouteChange);
    };
  }, []);

  return path;
}

function AppAnalytics() {
  const path = useCurrentPath();

  return <Analytics mode="production" route={path} path={path} />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <>
      <Index />
      <AppAnalytics />
      <SpeedInsights />
    </>
  </React.StrictMode>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Index from './index';
import './index.css';
import { initTracking } from './lib/tracking';

initTracking();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <>
      <Index />
      <Analytics />
      <SpeedInsights />
    </>
  </React.StrictMode>,
);

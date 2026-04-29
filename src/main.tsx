import React from 'react';
import ReactDOM from 'react-dom/client';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Index from './index';
import './index.css';
import { initTracking } from './lib/tracking';

initTracking();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <>
      <Index />
      <SpeedInsights />
    </>
  </React.StrictMode>,
);

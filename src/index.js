import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json'; // Make sure the path is correct for your en.json file
import teTranslations from './locales/te.json'; 
import * as Sentry from '@sentry/react';

//dsn -> Data Source Name
Sentry.init({
  dsn: "https://3d98b29fe06a0a8df770299f96e9b7ad@o4505658993016832.ingest.sentry.io/4505659186085888",
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost", "https:yourserver.io/api/"],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});


//LanguageDetector automatically detects user preferred language based on browser settings
i18n.use(LanguageDetector).init({
  resources: {
    // en: {
    //   translation: enTranslations
    // },
    tel: {
      translation: teTranslations
    }
  },
  fallbackLng: 'en', 
  debug: true,
  interpolation: {
    escapeValue: false
  } //interpolation: This allows raw HTML in translation strings by setting escapeValue to false
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();







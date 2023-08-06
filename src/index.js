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







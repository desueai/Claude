'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import esCommon from '@/locales/es/common.json';
import enCommon from '@/locales/en/common.json';

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        es: { common: esCommon },
        en: { common: enCommon },
      },
      lng: typeof window !== 'undefined' ? (localStorage.getItem('lang') || 'es') : 'es',
      fallbackLng: 'es',
      defaultNS: 'common',
      interpolation: { escapeValue: false },
    });
}

export default i18n;

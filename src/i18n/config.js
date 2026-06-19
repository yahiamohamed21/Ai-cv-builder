import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en.json';
import arTranslations from './locales/ar.json';
import { adminLocaleOverrides } from './adminLocaleOverrides';

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: { ...enTranslations, ...adminLocaleOverrides.en } },
        ar: { translation: { ...arTranslations, ...adminLocaleOverrides.ar } }
    },
    lng: localStorage.getItem('lng') || 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
});

export default i18n;

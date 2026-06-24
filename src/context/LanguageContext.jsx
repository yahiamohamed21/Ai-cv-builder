import { createContext, useContext, useEffect, useState } from 'react';
import i18n from '../i18n/config';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(i18n.resolvedLanguage || i18n.language || localStorage.getItem('lng') || 'en');

    useEffect(() => {
        const dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.dir = dir;
        document.documentElement.lang = language;
        localStorage.setItem('lng', language);
    }, [language]);

    useEffect(() => {
        const handleLanguageChanged = (lng) => {
            setLanguage(lng);
        };

        i18n.on('languageChanged', handleLanguageChanged);

        return () => {
            i18n.off('languageChanged', handleLanguageChanged);
        };
    }, []);

    const changeLanguage = async (lng) => {
        const currentLanguage = i18n.resolvedLanguage || i18n.language || language;
        if (!lng || lng === currentLanguage) return;
        await i18n.changeLanguage(lng);
        setLanguage(lng);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);

import React, { createContext, useState, useContext, useEffect } from 'react';
import { en } from '../translations/en';
import { ar } from '../translations/ar';

const LanguageContext = createContext();

export const translations = { en, ar };

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Check local storage or default to 'en'
    const saved = localStorage.getItem('language');
    return saved || 'en';
  });

  useEffect(() => {
    // Update local storage
    localStorage.setItem('language', language);
    // Update HTML dir attribute for RTL support
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};

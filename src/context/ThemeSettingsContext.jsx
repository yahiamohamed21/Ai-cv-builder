import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeSettingsContext = createContext();

export const ThemeSettingsProvider = ({ children }) => {
  // Default primary color matching index.css --color-primary
  const [primaryColor, setPrimaryColor] = useState(() => {
    return localStorage.getItem('appPrimaryColor') || '#1132d4';
  });

  // Dark mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('appDarkMode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Update CSS root variable when color changes
    document.documentElement.style.setProperty('--color-primary', primaryColor);
    localStorage.setItem('appPrimaryColor', primaryColor);
  }, [primaryColor]);

  useEffect(() => {
    // Apply dark class to html element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('appDarkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeSettingsContext.Provider value={{ primaryColor, setPrimaryColor, isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeSettingsContext.Provider>
  );
};

export const useThemeSettings = () => useContext(ThemeSettingsContext);

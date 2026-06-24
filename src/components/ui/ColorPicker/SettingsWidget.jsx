import React, { useState, useRef, useEffect } from 'react';
import ColorPicker from './ColorPicker';
import { useThemeSettings } from '../../../context/ThemeSettingsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const PRESET_COLORS = [
  '#1132d4', // Default Blue
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#14b8a6', // Teal
  '#f97316', // Orange
];

const SettingsWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { primaryColor, setPrimaryColor, isDarkMode, toggleDarkMode } = useThemeSettings();
  const widgetRef = useRef(null);

  // Close the widget when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={widgetRef} className="fixed right-0 top-0 h-full z-50 flex items-center">
      {/* Settings Toggle Button */}
      <button
        onClick={toggleOpen}
        className={`fixed right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-xl p-3 rounded-l-xl transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] border border-r-0 border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary group cursor-pointer z-[60] ${isOpen ? 'translate-x-[calc(100%+24px)]' : 'translate-x-0'
          }`}
        style={{
          boxShadow: '-4px 0 15px rgba(0, 0, 0, 0.05)'
        }}
        aria-label="Open Theme Settings"
      >
        <FontAwesomeIcon icon={faCog} className="w-6 h-6 animate-[spin_4s_linear_infinite] group-hover:animate-none group-hover:scale-110 transition-transform" />
      </button>

      {/* Settings Sidebar Panel */}
      <div
        className={`h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-l border-gray-200 dark:border-gray-800 shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'
          } w-80 md:w-96 flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pt-24 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Theme Settings</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Customize your experience</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close Settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-8 flex-1">

          {/* Theme Mode Toggle */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">Appearance</h3>
            <div className="flex items-center p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <button
                onClick={() => !isDarkMode ? null : toggleDarkMode()}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${!isDarkMode
                  ? 'bg-white text-gray-900 shadow-sm dark:bg-transparent dark:text-gray-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
              >
                <FontAwesomeIcon icon={faSun} className={!isDarkMode ? 'text-amber-500' : ''} />
                Light
              </button>
              <button
                onClick={() => isDarkMode ? null : toggleDarkMode()}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${isDarkMode
                  ? 'bg-gray-700 text-white shadow-sm dark:bg-gray-700/80 dark:text-white'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                <FontAwesomeIcon icon={faMoon} className={isDarkMode ? 'text-blue-400' : ''} />
                Dark
              </button>
            </div>
          </div>

          <hr className="border-gray-100 dark:border-gray-800" />

          {/* Color Presets */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">Preset Colors</h3>
            <div className="flex flex-wrap gap-3">
              {PRESET_COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => setPrimaryColor(color)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-sm ${primaryColor.toLowerCase() === color.toLowerCase() ? 'ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-900' : 'ring-1 ring-gray-200 dark:ring-gray-700'
                    }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select preset color ${color}`}
                >
                  {primaryColor.toLowerCase() === color.toLowerCase() && (
                    <svg className="w-5 h-5 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-gray-100 dark:border-gray-800" />

          {/* Custom Color Picker */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">Custom Color</h3>
            <ColorPicker defaultColor={primaryColor} onChange={setPrimaryColor} />
          </div>

        </div>
      </div>

      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-[-1] md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default SettingsWidget;

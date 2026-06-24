import React, { useState, useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import SplashScreen from './components/ui/SplashScreen';
import SettingsWidget from './components/ui/ColorPicker/SettingsWidget';
import { ThemeSettingsProvider } from './context/ThemeSettingsContext';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show splash screen for a short duration when the app first loads
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Adjust duration as needed
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <ThemeSettingsProvider>
      <div className="min-h-screen relative">
        <SettingsWidget />
        <AppRoutes />
      </div>
    </ThemeSettingsProvider>
  );
}

export default App;

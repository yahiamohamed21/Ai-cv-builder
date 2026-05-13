import React, { useState, useEffect } from "react";

// Helper functions for color conversion
const hexToRgb = (hex) => {
  // Remove # if present
  hex = hex.replace(/^#/, "");
  
  // Parse HEX
  let bigint = parseInt(hex, 16);
  let r, g, b;

  if (hex.length === 3) {
    r = (bigint >> 8) & 255;
    g = (bigint >> 4) & 255;
    b = bigint & 255;
    r = (r << 4) | r;
    g = (g << 4) | g;
    b = (b << 4) | b;
  } else {
    r = (bigint >> 16) & 255;
    g = (bigint >> 8) & 255;
    b = bigint & 255;
  }

  return { r, g, b };
};

const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const ColorPicker = ({ defaultColor = "#3b82f6", onChange }) => {
  const [color, setColor] = useState(defaultColor);
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(null);

  // Initialize history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("reactColorPickerHistory");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse color history");
      }
    }
  }, []);

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    if (onChange) onChange(newColor);
  };

  const handleColorSelectEnd = () => {
    setHistory((prev) => {
      // Add to front, remove duplicates, limit to 10
      const newHistory = [color, ...prev.filter(c => c !== color)].slice(0, 10);
      localStorage.setItem("reactColorPickerHistory", JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const selectHistoryColor = (c) => {
    setColor(c);
    if (onChange) onChange(c);
    
    // Move to front of history
    setHistory((prev) => {
      const newHistory = [c, ...prev.filter(item => item !== c)];
      localStorage.setItem("reactColorPickerHistory", JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  return (
    <div className="w-full font-sans">
      <div className="flex items-center gap-5 mb-8">        {/* Modern Interactive Color Preview & Input */}
        <div className="relative w-20 h-20 shrink-0 group">
          <div 
            className="absolute inset-0 rounded-full shadow-[inset_0_4px_8px_rgba(0,0,0,0.1)] border border-gray-200 dark:border-gray-600 transition-transform duration-300 group-hover:scale-105 pointer-events-none z-10"
            style={{ backgroundColor: color }}
          />
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            onBlur={handleColorSelectEnd}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            title="Click to select color"
          />
          {/* Decorative outer ring */}
          <div className="absolute -inset-1 bg-gradient-to-tr from-gray-200 to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-full z-0 group-hover:scale-110 transition-transform duration-300 opacity-50"></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">
            Selected Color
          </p>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-wide uppercase truncate">
            {color}
          </h3>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {/* Value Rows */}
        {[
          { label: "HEX", value: color.toUpperCase(), type: "hex" },
          { label: "RGB", value: rgbString, type: "rgb" },
          { label: "HSL", value: hslString, type: "hsl" }
        ].map(({ label, value, type }) => (
          <div key={type} className="flex items-center bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3 border border-gray-100 dark:border-gray-700/50 group hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 w-12 shrink-0 tracking-wider">
              {label}
            </span>
            <span className="font-mono text-sm px-2 text-gray-700 dark:text-gray-300 truncate w-full selection:bg-blue-100 dark:selection:bg-blue-900/50">
              {value}
            </span>
            <button
              onClick={() => copyToClipboard(value, type)}
              className={`p-2 rounded-lg transition-all ${
                copied === type 
                  ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" 
                  : "text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
              title={`Copy ${label}`}
              aria-label={`Copy ${label} value`}
            >
              {copied === type ? <CheckIcon /> : <CopyIcon />}
            </button>
          </div>
        ))}
      </div>

      {history.length > 0 && (
        <div className="pt-5 border-t border-gray-100 dark:border-gray-700/50">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              Recent Colors
            </h4>
            <button 
              onClick={() => {
                setHistory([]);
                localStorage.removeItem("reactColorPickerHistory");
              }}
              className="text-xs font-medium text-gray-400 hover:text-red-500 transition-colors dark:text-gray-500 dark:hover:text-red-400"
            >
              Clear History
            </button>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {history.map((hColor, idx) => (
              <button
                key={`${hColor}-${idx}`}
                onClick={() => selectHistoryColor(hColor)}
                className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 shadow-sm transition-all hover:scale-110 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                style={{ backgroundColor: hColor }}
                title={hColor}
                aria-label={`Select recent color ${hColor}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;

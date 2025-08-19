import { useCallback, useEffect, useState } from "react";

// Background themes
const backgroundPresets = {
  dark: {
    name: "Dark",
    background: "#050913",
    surface: "#1e293b",
    card: "#0f172a",
  },
  darker: {
    name: "Darker",
    background: "#000000",
    surface: "#111111",
    card: "#1a1a1a",
  },
  slate: {
    name: "Slate",
    background: "#0f172a",
    surface: "#1e293b",
    card: "#334155",
  },
  warm: {
    name: "Warm Dark",
    background: "#1c1917",
    surface: "#292524",
    card: "#44403c",
  },
  cool: {
    name: "Cool Dark",
    background: "#0c1427",
    surface: "#1e293b",
    card: "#334155",
  },
} as const;

// Theme presets
const themePresets = {
  blue: {
    name: "Blue",
    primary: "#0ea5e9",
    primaryHover: "#0284c7",
    primaryLight: "#38bdf8",
    primaryDark: "#0369a1",
    accent: "#3b82f6",
  },
  green: {
    name: "Green", 
    primary: "#22c55e",
    primaryHover: "#16a34a",
    primaryLight: "#4ade80",
    primaryDark: "#15803d",
    accent: "#10b981",
  },
  purple: {
    name: "Purple",
    primary: "#8b5cf6",
    primaryHover: "#7c3aed",
    primaryLight: "#a78bfa",
    primaryDark: "#6d28d9",
    accent: "#a855f7",
  },
  orange: {
    name: "Orange",
    primary: "#f59e0b",
    primaryHover: "#d97706",
    primaryLight: "#fbbf24",
    primaryDark: "#b45309",
    accent: "#f97316",
  },
  rose: {
    name: "Rose",
    primary: "#f43f5e",
    primaryHover: "#e11d48",
    primaryLight: "#fb7185",
    primaryDark: "#be123c",
    accent: "#ec4899",
  },
  emerald: {
    name: "Emerald",
    primary: "#10b981",
    primaryHover: "#059669",
    primaryLight: "#34d399",
    primaryDark: "#047857",
    accent: "#6ee7b7",
  },
} as const;

export type ThemeKey = keyof typeof themePresets;
export type BackgroundKey = keyof typeof backgroundPresets;


interface ThemeState {
  activeTheme: ThemeKey;
  activeBackground: BackgroundKey;
}

// Storage keys
const STORAGE_KEYS = {
  THEME: 'app-theme',
  BACKGROUND: 'app-background',
  CUSTOM_THEME: 'app-custom-theme',
  IS_CUSTOM: 'app-theme-is-custom',
} as const;

// Default values
const DEFAULT_THEME: ThemeKey = 'blue';
const DEFAULT_BACKGROUND: BackgroundKey = 'dark';

export function useTheme() {
  const [themeState, setThemeState] = useState<ThemeState>({
    activeTheme: DEFAULT_THEME,
    activeBackground: DEFAULT_BACKGROUND,
  });

  // Apply theme to CSS variables
  const applyTheme = useCallback((theme: typeof themePresets[ThemeKey]) => {
    const root = document.documentElement;
    
    if ('name' in theme) {
      // Preset theme
      root.style.setProperty('--primary', theme.primary);
      root.style.setProperty('--primary-hover', theme.primaryHover);
      root.style.setProperty('--primary-light', theme.primaryLight);
      root.style.setProperty('--primary-dark', theme.primaryDark);
      root.style.setProperty('--accent', theme.accent);
      
      // Update button variants to match new primary color
      root.style.setProperty('--button-semi-primary', `${theme.primary}30`);
      root.style.setProperty('--button-hover-semi-primary', `${theme.primary}25`);
      root.style.setProperty('--input-border-focus', theme.primary);
    }
  }, []);

  // Apply background theme
  const applyBackground = useCallback((background: typeof backgroundPresets[BackgroundKey]) => {
    const root = document.documentElement;
    
    root.style.setProperty('--background', background.background);
    root.style.setProperty('--surface', background.surface);
    root.style.setProperty('--card', background.card);
    
    // Update related background variables
    root.style.setProperty('--input-background', background.surface);
    root.style.setProperty('--modal-background', background.card);
  }, []);

  // Load saved theme from localStorage
  const loadSavedTheme = useCallback(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
      const savedBackground = localStorage.getItem(STORAGE_KEYS.BACKGROUND);
      const savedCustomTheme = localStorage.getItem(STORAGE_KEYS.CUSTOM_THEME);
      const savedIsCustom = localStorage.getItem(STORAGE_KEYS.IS_CUSTOM) === 'true';

      if (savedIsCustom && savedCustomTheme) {
        const parsed = JSON.parse(savedCustomTheme);
        setThemeState(prev => ({
          ...prev,
          customTheme: parsed,
          isCustomMode: true,
        }));
        applyTheme(parsed);
      } else {
        const newState = { ...themeState };
        
        if (savedTheme && savedTheme in themePresets) {
          const themeKey = savedTheme as ThemeKey;
          newState.activeTheme = themeKey;
          applyTheme(themePresets[themeKey]);
        }
        
        if (savedBackground && savedBackground in backgroundPresets) {
          const backgroundKey = savedBackground as BackgroundKey;
          newState.activeBackground = backgroundKey;
          applyBackground(backgroundPresets[backgroundKey]);
        }

        setThemeState(newState);
      }
    } catch (error) {
      console.error('Error loading saved theme:', error);
      // Fall back to defaults
      applyTheme(themePresets[DEFAULT_THEME]);
      applyBackground(backgroundPresets[DEFAULT_BACKGROUND]);
    }
  }, [applyTheme, applyBackground]);

  // Initialize theme on mount
  useEffect(() => {
    loadSavedTheme();
  }, [loadSavedTheme]);

  // Handle preset theme selection
  const setTheme = useCallback((themeKey: ThemeKey) => {
    setThemeState(prev => ({
      ...prev,
      activeTheme: themeKey,
      isCustomMode: false,
    }));
    
    applyTheme(themePresets[themeKey]);
    localStorage.setItem(STORAGE_KEYS.THEME, themeKey);
    localStorage.setItem(STORAGE_KEYS.IS_CUSTOM, 'false');
  }, [applyTheme]);

  // Handle background selection
  const setBackground = useCallback((backgroundKey: BackgroundKey) => {
    setThemeState(prev => ({
      ...prev,
      activeBackground: backgroundKey,
    }));
    
    applyBackground(backgroundPresets[backgroundKey]);
    localStorage.setItem(STORAGE_KEYS.BACKGROUND, backgroundKey);
  }, [applyBackground]);


  // Reset to default theme
  const resetToDefault = useCallback(() => {
    const defaultState = {
      activeTheme: DEFAULT_THEME,
      activeBackground: DEFAULT_BACKGROUND,
    };
    
    setThemeState(defaultState);
    applyTheme(themePresets[DEFAULT_THEME]);
    applyBackground(backgroundPresets[DEFAULT_BACKGROUND]);
    
    // Clear localStorage
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }, [applyTheme, applyBackground]);

  return {
    // State
    ...themeState,
    
    // Presets
    themePresets,
    backgroundPresets,
    
    // Actions
    setTheme,
    setBackground,
    resetToDefault,
    
    // Utilities
    loadSavedTheme,
  };
}

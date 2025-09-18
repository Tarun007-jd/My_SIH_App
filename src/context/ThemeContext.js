import React, { createContext, useState, useContext, useEffect } from 'react';
import { StatusBar } from 'react-native';

// Create the theme context
const ThemeContext = createContext();

// Theme colors - Updated to ensure consistency
export const themes = {
  light: {
    mode: 'light',
    background: '#FFFFFF', // White background
    text: '#333333',      // Dark text
    primary: '#0055A4',   // Navy blue primary
    card: '#F8F9FA',      // Light gray for cards
    inputBg: '#FFFFFF',   // White input background
    inputText: '#333333', // Dark input text
    border: '#0055A4',    // Navy blue borders
    statusBar: {
      backgroundColor: '#000000',
      barStyle: 'dark-content'
    },
    shadow: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 4,
      elevation: 3,
    }
  },
  dark: {
    mode: 'dark',
    background: '#121212',  // Dark background
    text: '#F0F0F0',        // Light text
    primary: '#0077CC',     // Blue primary for dark mode
    card: '#1E1E1E',        // Darker card background
    inputBg: '#2C2C2C',     // Dark input background
    inputText: '#FFFFFF',   // White input text - fixed from #090000ff
    border: '#0077CC',      // Blue borders
    statusBar: {
      backgroundColor: '#000000',
      barStyle: 'light-content'
    },
    shadow: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    }
  }
};

export const ThemeProvider = ({ children }) => {
  // Use simple state without AsyncStorage
  const [theme, setTheme] = useState(themes.light);

  const updateStatusBar = (theme) => {
    StatusBar.setBarStyle(theme.statusBar.barStyle);
    StatusBar.setBackgroundColor(theme.statusBar.backgroundColor);
  };

  // Toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme.mode === 'light' ? themes.dark : themes.light;
    setTheme(newTheme);
    updateStatusBar(newTheme);
  };

  // Set initial status bar
  useEffect(() => {
    updateStatusBar(theme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};


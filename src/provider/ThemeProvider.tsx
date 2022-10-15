import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { darkTheme } from '../styles/theme';

const initialState = {
  dark: false,
  theme: darkTheme,
  toggleDarkMode: () => {},
};

export const ThemeContext = React.createContext(initialState);

export const ThemeProvider = ({ children }: { children: any }) => {
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(
    initialState.dark
  );
  const [currentTheme, setCurrentTheme] = React.useState(initialState.theme);

  /**
   * Get stored dark mode status.
   */
  React.useEffect(() => {
    (async () => {
      const darkModeState = await AsyncStorage.getItem('isDarkMode');
      if (darkModeState) {
        setIsDarkMode(JSON.parse(darkModeState));
      }
    })();
  }, []);

  const toggleDarkMode = async () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        dark: isDarkMode,
        theme: currentTheme,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

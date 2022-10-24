import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import ThemeContext from './ThemeContext';
import themeInitialState from './ThemeContext.default';
import ThemeProviderProps from './ThemeProvider.types';

export const ThemeProvider = (props: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(
    themeInitialState.dark
  );
  const [currentTheme, setCurrentTheme] = React.useState(
    themeInitialState.theme
  );

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
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

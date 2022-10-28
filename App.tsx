import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppContext from './AppContext';
import { NavigationContainer } from './src/navigation';

/**
 * Main entry point of the app.
 */
const App = () => {
  return (
    <AppContext>
      <StatusBar />
      <NavigationContainer />
    </AppContext>
  );
};

export default App;

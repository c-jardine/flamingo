import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { EventProvider } from 'react-native-outside-press';
import { RootSiblingParent } from 'react-native-root-siblings';

import 'react-native-url-polyfill/auto';
import { supabase } from './src/initSupabase';
import Navigation from './src/navigation';
import { AuthContext, AuthProvider } from './src/provider/AuthProvider';

// globalStyles.js
import { setGlobalStyles } from 'react-native-floating-label-input';
import { Provider } from 'react-redux';
import { ThemeProvider } from './src/provider/ThemeProvider';
import { store } from './src/redux/store';
import { color } from './src/styles/color';

setGlobalStyles.containerStyles = {
  backgroundColor: color.basePrimary['50'],
  padding: 12,
  borderRadius: 16,
  // any styles you want to generalize to your input container
};
setGlobalStyles.customLabelStyles = {
  colorBlurred: color.basePrimary['300'],
  colorFocused: color.basePrimary['800'],
  fontSizeBlurred: 16,
  fontSizeFocused: 14,
  // any styles you want to generalize to your floating label
};

/**
 * Main entry point of the app.
 */
const App = () => {
  const { session } = React.useContext(AuthContext);
  const appState = React.useRef(AppState.currentState);

  React.useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      _handleAppStateChange
    );
    return () => {
      // TODO: fix typing to remove this error
      subscription.remove();
    };
  }, []);

  /**
   * Uses AppState to manage a user's online status.
   * @param {AppStateStatus} nextAppState The state of the app being triggered.
   */
  const _handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // User is online (app is open)
      await supabase
        .from('profiles')
        .update({ is_online: true, last_online: new Date().toISOString() })
        .eq('id', session?.user?.id);
    } else {
      // User is offline (app is closed)
      await supabase
        .from('profiles')
        .update({ is_online: false, last_online: new Date().toISOString() })
        .eq('id', session?.user?.id);
    }

    appState.current = nextAppState;
  };

  return (
    <Provider store={store}>
      <RootSiblingParent>
        <EventProvider style={{ flex: 1 }}>
          <AuthProvider>
            <ThemeProvider>
              <StatusBar />
              <Navigation />
            </ThemeProvider>
          </AuthProvider>
        </EventProvider>
      </RootSiblingParent>
    </Provider>
  );
};

export default App;

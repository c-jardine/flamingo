import React from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { setGlobalStyles } from 'react-native-floating-label-input';
import 'react-native-get-random-values';
import { EventProvider } from 'react-native-outside-press';
import { RootSiblingParent } from 'react-native-root-siblings';
import 'react-native-url-polyfill/auto';
import { Provider } from 'react-redux';
import { AuthContext, AuthProvider, ThemeProvider } from './src/providers';
import { store } from './src/redux/store';
import { color } from './src/styles/color/color';
import { supabase } from './src/supabase';

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

const AppContext = (props: { children: React.ReactNode }) => {
  const { session } = React.useContext(AuthContext);
  const appState = React.useRef(AppState.currentState);

  React.useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      _handleAppStateChange
    );
    return () => {
      subscription.remove();
    };
  }, [appState]);

  /**
   * Uses AppState to manage a user's online status.
   * @param {AppStateStatus} nextAppState The state of the app being triggered.
   */
  const _handleAppStateChange = async (nextAppState: AppStateStatus) => {
    const userId = session?.user.id;
    if (
      userId !== undefined &&
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // User is online (app is open)
      await supabase
        .from('profiles')
        .update({ is_online: true, last_online: new Date().toISOString() })
        .eq('id', userId);
    } else {
      // User is offline (app is closed)
      await supabase
        .from('profiles')
        .update({ is_online: false, last_online: new Date().toISOString() })
        .eq('id', userId);
    }

    appState.current = nextAppState;
  };

  return (
    <Provider store={store}>
      <RootSiblingParent>
        <EventProvider style={{ flex: 1 }}>
          <AuthProvider>
            <ThemeProvider>{props.children}</ThemeProvider>
          </AuthProvider>
        </EventProvider>
      </RootSiblingParent>
    </Provider>
  );
};

export default AppContext;

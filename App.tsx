import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { setGlobalStyles } from 'react-native-floating-label-input';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { useSelector } from 'react-redux';
import AppContext from './AppContext';
import { LoadingOverlay } from './src/components/common';
import { NavigationContainer } from './src/navigation';
import { AuthContext } from './src/providers';
import { RootState } from './src/redux/store';
import { ProfileProps } from './src/shared/types';
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

/**
 * Main entry point of the app.
 */
const App = () => {
  const { session, setProfile } = React.useContext(AuthContext);
  const appState = React.useRef(AppState.currentState);

  const loading = useSelector((state: RootState) => state.appReducer.loading);

  React.useEffect(() => {
    (async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      const userId = userData.user?.id;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      setProfile && setProfile(data as ProfileProps);
    })();
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
    <AppContext>
      {loading && <LoadingOverlay />}
      <StatusBar />
      <NavigationContainer />
    </AppContext>
  );
};

export default App;

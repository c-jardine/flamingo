import React from 'react';
import 'react-native-get-random-values';
import { EventProvider } from 'react-native-outside-press';
import { RootSiblingParent } from 'react-native-root-siblings';
import 'react-native-url-polyfill/auto';
import { Provider } from 'react-redux';
import { AuthProvider, ThemeProvider } from './src/providers';
import { store } from './src/redux/store';

const AppContext = (props: { children: React.ReactNode }) => {
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

/* eslint-disable react/jsx-filename-extension */
/* eslint-disable camelcase */
import React, { useEffect } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import AppLoading from "expo-app-loading";
import { OverflowMenuProvider } from "react-navigation-header-buttons";
import {
  Inter_400Regular,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import * as Sentry from "sentry-expo";
import AppNavigator from "./navigation/AppNavigator";

import authReducer from "./store/authReducer";
import scrobblesReducer from "./store/scrobblesReducer";
import { getSpotifyToken } from "./utils/spotify";

Sentry.init({
  dsn:
    "https://9b633e0f819348a3b8f6d603cac7d211@o270434.ingest.sentry.io/5783875",
  enableInExpoDevelopment: true,
  debug: `${process.env.DEV === true}`, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
});

// // Access any @sentry/react-native exports via:
// Sentry.Native.*

// // Access any @sentry/browser exports via:
// Sentry.Browser.*

const roorReducer = combineReducers({
  auth: authReducer,
  scrobbles: scrobblesReducer,
});

const store = createStore(roorReducer, applyMiddleware(ReduxThunk));

// Disabled those lines in order to make the stacks screens work with the new Expo SDK 40 update.
// import { enableScreens } from 'react-native-screens'
// enableScreens()

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  useEffect(() => {
    const fetchData = async () => {
      await getSpotifyToken();
    };
    fetchData();
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <OverflowMenuProvider>
        <AppNavigator />
      </OverflowMenuProvider>
    </Provider>
  );
}

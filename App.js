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
import AppNavigator from "./navigation/AppNavigator";

import authReducer from "./store/authReducer";
import scrobblesReducer from "./store/scrobblesReducer";
import { getSpotifyToken } from "./utils/spotify";

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

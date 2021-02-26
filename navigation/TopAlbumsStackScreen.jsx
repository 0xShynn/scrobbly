import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TopAlbumsScreen from "../screens/TopAlbumsScreen";
import AlbumDetailsScreen from "../screens/AlbumDetailsScreen";
import defaultNavOptions from "./defaultNavOptions";
import ScrobbleDetailsScreen from "../screens/ScrobbleDetailsScreen";
import ArtistDetailsScreen from "../screens/ArtistDetailsScreen";
import BiographyScreen from "../screens/BiographyScreen";

const Stack = createStackNavigator();

const TopAlbumsStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions()}>
      <Stack.Screen name="Top Albums" component={TopAlbumsScreen} />
      <Stack.Screen name="Album Details" component={AlbumDetailsScreen} />
      <Stack.Screen name="Scrobble Details" component={ScrobbleDetailsScreen} />
      <Stack.Screen name="Artist Details" component={ArtistDetailsScreen} />
      <Stack.Screen name="Biography" component={BiographyScreen} />
    </Stack.Navigator>
  );
};

export default TopAlbumsStackScreen;

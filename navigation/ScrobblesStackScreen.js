import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ScrobblesScreen from '../screens/ScrobblesScreen';
import ScrobbleDetailsScreen from '../screens/ScrobbleDetailsScreen';
import AlbumDetailsScreen from '../screens/AlbumDetailsScreen';
import ArtistDetailsScreen from '../screens/ArtistDetailsScreen';
import { defaultNavOptions } from './defaultNavOptions';
import BiographyScreen from '../screens/BiographyScreen';
import MyAccountScreen from '../screens/MyAccountScreen';
import AboutThisApp from '../screens/AboutThisApp';

const Stack = createStackNavigator();

const ScrobblesStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={defaultNavOptions()}>
      <Stack.Screen name="Scrobbles" component={ScrobblesScreen} />
      <Stack.Screen name="Scrobble Details" component={ScrobbleDetailsScreen} />
      <Stack.Screen name="Artist Details" component={ArtistDetailsScreen} />
      <Stack.Screen name="Album Details" component={AlbumDetailsScreen} />
      <Stack.Screen name="Biography" component={BiographyScreen} />
      <Stack.Screen name="My Account" component={MyAccountScreen} />
      <Stack.Screen name="About this App" component={AboutThisApp} />
    </Stack.Navigator>
  );
};

export default ScrobblesStackScreen;

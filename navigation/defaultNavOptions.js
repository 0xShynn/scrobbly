import { useColorScheme } from 'react-native'
import { TransitionPresets } from '@react-navigation/stack'
import myColors from '../constants/myColors'

export const defaultNavOptions = () => {
  const isDarkTheme = useColorScheme() === 'dark' ? true : false

  const obj = {
    headerStyle: {
      backgroundColor: isDarkTheme ? myColors.cool_gray_800 : 'white',
      shadowColor: 'transparent',
      elevation: 0,
      borderBottomColor: isDarkTheme
        ? myColors.cool_gray_700
        : myColors.cool_gray_100,
      borderBottomWidth: 1,
    },
    headerTitleStyle: {
      fontFamily: 'Inter_700Bold',
      fontSize: 18,
    },
    headerTintColor: isDarkTheme ? 'white' : myColors.cool_gray_900,
    ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
  }
  return obj
}

import myColors from '../constants/myColors'
import { TransitionPresets } from '@react-navigation/stack'

export const defaultNavOptions = {
  headerStyle: {
    backgroundColor: myColors.cool_gray_800,
    shadowColor: 'transparent',
    elevation: 0,
    borderBottomColor: myColors.cool_gray_700,
    borderBottomWidth: 1,
  },
  headerTitleStyle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
  },
  headerTintColor: 'white',
  ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
}

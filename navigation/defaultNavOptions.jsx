import { TransitionPresets } from "@react-navigation/stack";
import myColors from "../constants/myColors";
import useColorScheme from "../hooks/useColorSchemeFix";

const defaultNavOptions = () => {
  const isDarkTheme = useColorScheme() === "dark";

  const obj = {
    headerStyle: {
      backgroundColor: isDarkTheme ? myColors.gray_1100 : "white",
      shadowColor: "transparent",
      elevation: 0,
      borderBottomWidth: 1,
      borderBottomColor: isDarkTheme ? myColors.gray_1000 : myColors.gray_200,
    },
    headerTitleStyle: {
      fontFamily: "Inter_700Bold",
      fontSize: 18,
    },
    headerTintColor: isDarkTheme ? "white" : myColors.gray_900,
    ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
  };
  return obj;
};

export default defaultNavOptions;

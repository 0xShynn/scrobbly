import React from "react";
import { Image } from "react-native";
import Constants from "expo-constants";
import useColorScheme from "react-native/Libraries/Utilities/useColorScheme";

import CenteredContainer from "../components/UI/CenteredContainer";
import CustomText from "../components/UI/CustomText";
import myColors from "../constants/myColors";
import spacing from "../constants/spacing";

const AboutThisVersionScreen = () => {
  const isDarkTheme = useColorScheme() === "dark";

  return (
    <CenteredContainer
      style={{
        paddingHorizontal: spacing.lg,
        backgroundColor: isDarkTheme ? myColors.gray_1100 : myColors.gray_100,
      }}
    >
      <Image
        source={require("../assets/icon-rounded.png")}
        style={{
          width: 80,
          height: 80,
          marginBottom: spacing.lg,
        }}
      />
      <CustomText size="H3" bold complementaryStyle={{ marginBottom: 10 }}>
        Scrobbly version
        {Constants.manifest.version}
      </CustomText>

      <CustomText size="H6" complementaryStyle={{ marginBottom: 20 }}>
        Expo version {Constants.expoVersion}
      </CustomText>

      <CustomText
        size="H7"
        complementaryStyle={{ textAlign: "center", marginBottom: spacing.xl }}
      >
        The app was created by Antonin Nhek using React Native and Expo.
        Copyright ©{new Date().getFullYear()} Scrobbly.
      </CustomText>
    </CenteredContainer>
  );
};

export default AboutThisVersionScreen;

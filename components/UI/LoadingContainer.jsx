import React from "react";
import { ActivityIndicator } from "react-native";
import myColors from "../../constants/myColors";
import useColorScheme from "../../hooks/useColorSchemeFix";
import CenteredContainer from "./CenteredContainer";

const LoadingContainer = () => {
  const isDarkTheme = useColorScheme() === "dark";

  return (
    <CenteredContainer
      style={{
        backgroundColor: isDarkTheme ? myColors.gray_1100 : myColors.gray_100,
      }}
    >
      <ActivityIndicator
        size="large"
        color={isDarkTheme ? "white" : myColors.gray_600}
      />
    </CenteredContainer>
  );
};

export default LoadingContainer;

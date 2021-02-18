import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

import CenteredContainer from "./CenteredContainer";
import CustomText from "./CustomText";
import CustomButton from "./CustomButton";

import useColorScheme from "../../hooks/useColorSchemeFix";
import myColors from "../../constants/myColors";
import spacing from "../../constants/spacing";

const ErrorContainer = ({ error, retryFunc }) => {
  const isDarkTheme = useColorScheme() === "dark";

  return (
    <CenteredContainer
      style={{
        padding: 30,
        backgroundColor: isDarkTheme ? myColors.gray_1100 : myColors.gray_100,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isDarkTheme ? myColors.gray_1000 : "white",
          borderWidth: isDarkTheme ? 0 : 1,
          borderColor: isDarkTheme ? "black" : myColors.gray_200,
          padding: 30,
          borderRadius: 20,
        }}
      >
        <SimpleLineIcons name="support" size={36} color={myColors.primary} />
        <CustomText
          size="H3"
          bold
          color={myColors.primary}
          complementaryStyle={{
            marginVertical: spacing.lg,
            textAlign: "center",
          }}
        >
          Oops, something wrong has happened.
        </CustomText>
        <CustomText
          size="H6"
          color={isDarkTheme ? myColors.gray_100 : myColors.gray_900}
          complementaryStyle={{ marginBottom: spacing.lg }}
        >
          {error}
        </CustomText>
        <CustomButton label="Retry" onPress={retryFunc} />
      </View>
    </CenteredContainer>
  );
};

ErrorContainer.propTypes = {
  error: PropTypes.string.isRequired,
  retryFunc: PropTypes.func.isRequired,
};

export default ErrorContainer;

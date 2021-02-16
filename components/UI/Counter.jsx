import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import myColors from "../../constants/myColors";
import spacing from "../../constants/spacing";
import CustomText from "./CustomText";
import useColorScheme from "../../hooks/useColorSchemeFix";

const Counter = ({ style, title, icon, value }) => {
  const isDarkTheme = useColorScheme() === "dark";

  return (
    <View
      style={{
        paddingRight: spacing.lg,
        ...style,
      }}
    >
      <CustomText
        size="H6"
        color={isDarkTheme ? myColors.gray_400 : myColors.gray_700}
        complementaryStyle={{ marginBottom: 4 }}
      >
        {title}
      </CustomText>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons
          name={icon}
          size={20}
          color={isDarkTheme ? "white" : myColors.gray_900}
        />
        <CustomText
          bold
          size="H5"
          color={isDarkTheme ? "white" : myColors.gray_900}
          complementaryStyle={{ marginLeft: spacing.xs }}
        >
          {value}
        </CustomText>
      </View>
    </View>
  );
};

export default Counter;

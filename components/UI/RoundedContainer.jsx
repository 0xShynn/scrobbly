import React from "react";
import { View } from "react-native";
import myColors from "../../constants/myColors";
import spacing from "../../constants/spacing";
import useColorScheme from "../../hooks/useColorSchemeFix";

const RoundedContainer = ({ children, style }) => {
  const isDarkTheme = useColorScheme() === "dark";

  return (
    <View
      style={{
        backgroundColor: isDarkTheme ? myColors.gray_1050 : "white",
        borderRadius: spacing.md,
        padding: spacing.sm,
        shadowColor: "black",
        shadowRadius: 3,
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.05,
        ...style,
      }}
    >
      {children}
    </View>
  );
};

export default RoundedContainer;

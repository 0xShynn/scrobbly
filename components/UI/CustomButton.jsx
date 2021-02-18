import React from "react";
import PropTypes from "prop-types";

import { TouchableOpacity } from "react-native";
import myColors from "../../constants/myColors";
import spacing from "../../constants/spacing";
import CustomText from "./CustomText";

export default function CustomButton({ label, onPress, themeColor }) {
  const buttonBgColorHandler = (value) => {
    switch (value) {
      case "primary":
        return myColors.primary;

      case "secondary":
        return myColors.gray_600;

      default:
        return myColors.gray_400;
    }
  };

  const buttonTextColorHandler = (value) => {
    switch (value) {
      case "primary":
        return "white";

      default:
        return "white";
    }
  };

  return (
    <TouchableOpacity
      style={{
        borderRadius: 24,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        justifyContent: "center",
        alignItems: "center",
        minWidth: 160,
        backgroundColor: buttonBgColorHandler(themeColor),
      }}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <CustomText size="H5" bold color={buttonTextColorHandler(themeColor)}>
        {label}
      </CustomText>
    </TouchableOpacity>
  );
}

CustomButton.propTypes = {
  label: PropTypes.string.isRequired,
  themeColor: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

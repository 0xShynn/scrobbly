/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import myColors from "../../constants/myColors";
import useColorScheme from "../../hooks/useColorSchemeFix";

const CustomText = ({
  bold,
  size,
  color,
  complementaryStyle,
  children,
  ...otherProps
}) => {
  const isDarkTheme = useColorScheme() === "dark";

  const fontSizeHandler = (sizeText) => {
    switch (sizeText) {
      case "H7":
        return 12;
      case "H6":
        return 14;
      case "H5":
        return 16;
      case "H4":
        return 18;
      case "H3":
        return 20;
      case "H2":
        return 28;
      case "H1":
        return 30;
      default:
        return 14;
    }
  };

  // const colorHandler = (selectedColor) => {
  //   switch (selectedColor) {
  //     case selectedColor:
  //       return selectedColor;
  //     case selectedColor && isDarkTheme:
  //       return "red";
  //     case selectedColor && !isDarkTheme:
  //       return myColors.gray_900;
  //     default:
  //       return selectedColor;
  //   }
  // };

  return (
    <Text
      style={{
        fontSize: fontSizeHandler(size),
        fontFamily: bold ? "Inter_700Bold" : "Inter_400Regular",
        color: color || (isDarkTheme ? myColors.gray_200 : myColors.gray_900),
        ...complementaryStyle,
      }}
      {...otherProps}
    >
      {children}
    </Text>
  );
};

CustomText.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.string.isRequired,
  bold: PropTypes.bool,
  color: PropTypes.string,
  complementaryStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

CustomText.defaultProps = {
  bold: false,
  color: null,
  complementaryStyle: {},
};

export default CustomText;

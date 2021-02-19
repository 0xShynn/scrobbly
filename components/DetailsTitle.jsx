import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CustomText from "./UI/CustomText";
import myColors from "../constants/myColors";
import useColorScheme from "../hooks/useColorSchemeFix";
import spacing from "../constants/spacing";

const DetailsTitle = ({ children, complementaryStyle }) => {
  const isDarkTheme = useColorScheme() === "dark";

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: spacing.xs,
        ...complementaryStyle,
      }}
    >
      <MaterialIcons name="arrow-right" size={30} color={myColors.gray_500} />
      <CustomText
        size="H3"
        bold
        color={isDarkTheme ? "white" : myColors.gray_900}
      >
        {children}
      </CustomText>
    </View>
  );
};

DetailsTitle.propTypes = {
  children: PropTypes.node.isRequired,
  complementaryStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

DetailsTitle.defaultProps = {
  complementaryStyle: {},
};

export default DetailsTitle;

/* eslint-disable react/jsx-props-no-spreading */
import React, { forwardRef } from "react";
import { TextInput, View } from "react-native";
import PropTypes from "prop-types";
import { Ionicons as Icon } from "@expo/vector-icons";
import myColors from "../../constants/myColors";
import spacing from "../../constants/spacing";
import useColorScheme from "../../hooks/useColorSchemeFix";

const MyTextInput = forwardRef(
  ({ icon, touched, error, ...otherProps }, ref) => {
    const isDarkTheme = useColorScheme() === "dark";

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 8,
          borderWidth: 1,
          borderColor: isDarkTheme ? myColors.gray_1000 : myColors.gray_400,
          backgroundColor: "white",
        }}
      >
        <View style={{ paddingLeft: spacing.md, paddingRight: spacing.xs }}>
          <Icon
            name={icon}
            color={touched ? myColors.gray_900 : "red"}
            size={20}
          />
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholderTextColor={myColors.gray_600}
            ref={ref}
            style={{ paddingVertical: spacing.md }}
            {...otherProps}
          />
        </View>
      </View>
    );
  }
);

MyTextInput.propTypes = {
  icon: PropTypes.string.isRequired,
  touched: PropTypes.bool.isRequired,
  error: PropTypes.object,
};

MyTextInput.defaultProps = {
  error: null,
};

export default MyTextInput;

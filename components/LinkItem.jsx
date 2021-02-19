import React from "react";
import { Pressable, View } from "react-native";
import PropTypes from "prop-types";

import { MaterialIcons } from "@expo/vector-icons";
import useColorScheme from "../hooks/useColorSchemeFix";
import myColors from "../constants/myColors";
import spacing from "../constants/spacing";

const LinkItem = ({ onPress, children, type }) => {
  const isDarkTheme = useColorScheme() === "dark";
  const backgroundColorHandler = (pressed) => {
    let bgColor;
    if (isDarkTheme && pressed) {
      bgColor = myColors.gray_950;
    } else if (isDarkTheme) {
      bgColor = myColors.gray_1050;
    } else if (pressed) {
      bgColor = myColors.gray_200;
    } else {
      bgColor = "white";
    }
    return bgColor;
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: backgroundColorHandler(pressed),
          paddingVertical: spacing.lg,
          paddingLeft: spacing.lg,
          paddingRight: spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: isDarkTheme
            ? myColors.gray_950
            : myColors.gray_100,
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
        },
      ]}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {children}
      </View>
      {type !== "signout" ? (
        <View style={{ paddingLeft: spacing.sm }}>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={20}
            color={myColors.gray_500}
          />
        </View>
      ) : null}
    </Pressable>
  );
};

LinkItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
};

LinkItem.defaultProps = {
  type: null,
};

export default LinkItem;

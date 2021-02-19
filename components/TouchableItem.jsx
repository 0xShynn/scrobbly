import React from "react";
import { TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import { MaterialIcons } from "@expo/vector-icons";
import RoundedContainer from "./UI/RoundedContainer";
import myColors from "../constants/myColors";
import spacing from "../constants/spacing";

const TouchableItem = ({ onPress, style, children }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <RoundedContainer
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          ...style,
        }}
      >
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          {children}
        </View>
        <View style={{ paddingLeft: spacing.xs }}>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={20}
            color={myColors.gray_500}
          />
        </View>
      </RoundedContainer>
    </TouchableOpacity>
  );
};

TouchableItem.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

TouchableItem.defaultProps = {
  style: {},
};

export default TouchableItem;

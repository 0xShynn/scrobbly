import React from "react";
import { View } from "react-native";

const CenteredContainer = ({ style, children }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
    >
      {children}
    </View>
  );
};

export default CenteredContainer;

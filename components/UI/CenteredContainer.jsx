import React from "react";
import PropTypes from "prop-types";
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

CenteredContainer.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  children: PropTypes.element.isRequired,
};

CenteredContainer.defaultProps = {
  style: {},
};

export default CenteredContainer;

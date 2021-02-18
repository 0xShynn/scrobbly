import React from "react";
import PropTypes from "prop-types";
import { RefreshControl } from "react-native";

export default function CustomRefreshControl({ onRefresh, isRefreshing }) {
  return (
    <RefreshControl
      colors={["white", "black"]}
      tintColor="white"
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      enabled
    />
  );
}

CustomRefreshControl.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
};

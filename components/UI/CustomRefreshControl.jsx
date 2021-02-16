import React from "react";
import { RefreshControl } from "react-native";

export default function CustomRefreshControl({ onRefresh, isRefreshing }) {
  return (
    <RefreshControl
      colors={["white", "black"]}
      tintColor="white"
      onRefresh={onRefresh}
      refreshing={isRefreshing}
      enabled={true}
    />
  );
}

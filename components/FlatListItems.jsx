import React, { forwardRef } from "react";
import { FlatList, View, RefreshControl } from "react-native";
import PropTypes from "prop-types";
import ListEmpty from "./ListEmpty";

import myColors from "../constants/myColors";
import useColorScheme from "../hooks/useColorSchemeFix";
import Scrobble from "../models/scrobble";

const listItemSeparator = () => <View style={{ height: 10 }} />;
const listFooter = () => <View style={{ height: 40 }} />;

const FlatListItems = forwardRef(
  ({ data, renderItem, ListHeaderComponent, onRefresh, isRefreshing }, ref) => {
    const isDarkTheme = useColorScheme() === "dark";

    return (
      <FlatList
        ref={ref}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={listItemSeparator}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={listFooter}
        ListEmptyComponent={ListEmpty}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{
          backgroundColor: isDarkTheme ? myColors.gray_1100 : myColors.gray_100,
          paddingVertical: 20,
          paddingHorizontal: 15,
        }}
        refreshControl={
          <RefreshControl
            colors={["white", "black"]}
            tintColor={isDarkTheme ? "white" : myColors.gray_300}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            enabled
          />
        }
      />
    );
  }
);

FlatListItems.propTypes = {
  data: PropTypes.arrayOf(PropTypes.instanceOf(Scrobble)).isRequired,
  renderItem: PropTypes.func.isRequired,
  ListHeaderComponent: PropTypes.func,
  onRefresh: PropTypes.func.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
};

FlatListItems.defaultProps = {
  ListHeaderComponent: null,
};

export default FlatListItems;

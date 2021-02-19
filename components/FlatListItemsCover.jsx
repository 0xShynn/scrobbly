import React, { useCallback, forwardRef } from "react";
import { FlatList, View, RefreshControl } from "react-native";
import PropTypes from "prop-types";

import ListEmpty from "./ListEmpty";

import myColors from "../constants/myColors";
import useColorScheme from "../hooks/useColorSchemeFix";
import Album from "../models/album";
import Artist from "../models/artist";

const listItemSeparator = () => <View style={{ height: 12 }} />;
const listFooter = () => <View style={{ height: 40 }} />;

const FlatListItemsCover = forwardRef(
  ({ data, renderItem, onRefresh, isRefreshing }, ref) => {
    const keyExtractor = useCallback((item) => item.id, []);
    const isDarkTheme = useColorScheme() === "dark";

    return (
      <FlatList
        ref={ref}
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={listItemSeparator}
        ListFooterComponent={listFooter}
        ListEmptyComponent={ListEmpty}
        keyExtractor={keyExtractor}
        horizontal={false}
        numColumns={2}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{
          paddingHorizontal: 10,
          paddingVertical: 20,
          backgroundColor: isDarkTheme ? myColors.gray_1100 : myColors.gray_100,
        }}
        refreshControl={
          <RefreshControl
            colors={["white", "black"]}
            tintColor={isDarkTheme ? "white" : myColors.gray_900}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            enabled
          />
        }
      />
    );
  }
);

FlatListItemsCover.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.instanceOf(Album),
      PropTypes.instanceOf(Artist),
    ])
  ).isRequired,
  renderItem: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
};

export default FlatListItemsCover;

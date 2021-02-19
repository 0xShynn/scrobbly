import React from "react";
import {
  HiddenItem,
  OverflowMenu,
  overflowMenuPressHandlerDropdownMenu,
} from "react-navigation-header-buttons";
import PropTypes from "prop-types";
import { SimpleLineIcons } from "@expo/vector-icons";
import { periods } from "../utils/lastfm";
import myColors from "../constants/myColors";
import useColorScheme from "../hooks/useColorSchemeFix";

const PeriodSelector = ({ onSelect }) => {
  const isDarkTheme = useColorScheme() === "dark";
  return (
    <OverflowMenu
      onPress={overflowMenuPressHandlerDropdownMenu}
      style={{ marginHorizontal: 10 }}
      OverflowIcon={
        <SimpleLineIcons
          name="calendar"
          size={24}
          color={isDarkTheme ? "white" : myColors.gray_900}
        />
      }
    >
      {periods.map((item) => {
        return (
          <HiddenItem
            key={Math.random()}
            title={item.name}
            onPress={() => onSelect(item)}
          />
        );
      })}
    </OverflowMenu>
  );
};

PeriodSelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default PeriodSelector;

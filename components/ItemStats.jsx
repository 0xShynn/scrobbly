import React from "react";
import PropTypes from "prop-types";
import { Dimensions } from "react-native";
import RoundedContainer from "./UI/RoundedContainer";
import Counter from "./UI/Counter";
import spacing from "../constants/spacing";
import myColors from "../constants/myColors";
import abbreviateNumber from "../utils/numbers";
import useColorScheme from "../hooks/useColorSchemeFix";

const ItemStats = ({ playcount, listeners, userplaycount, topPlaycount }) => {
  const deviceWidth = Dimensions.get("window").width;
  const isDarkTheme = useColorScheme() === "dark";

  return (
    <RoundedContainer
      style={{
        flex: 1,
        flexWrap: deviceWidth < 380 ? "no-wrap" : "wrap",
        justifyContent: "flex-start",
        flexDirection: "row",
        marginBottom: spacing.md,
        backgroundColor: isDarkTheme ? myColors.gray_1100 : myColors.gray_100,
        borderColor: isDarkTheme ? myColors.gray_1000 : myColors.gray_200,
        borderWidth: 1,
        padding: deviceWidth < 380 ? spacing.sm : spacing.md,
      }}
    >
      <Counter
        title="Scrobbles"
        icon="ios-globe"
        value={abbreviateNumber(playcount)}
      />
      <Counter
        title="Listeners"
        icon="md-person"
        value={abbreviateNumber(listeners)}
      />
      <Counter
        title="My scrobbles"
        icon="ios-musical-notes"
        value={topPlaycount || userplaycount}
      />
    </RoundedContainer>
  );
};

ItemStats.propTypes = {
  playcount: PropTypes.string.isRequired,
  listeners: PropTypes.string.isRequired,
  userplaycount: PropTypes.string.isRequired,
  topPlaycount: PropTypes.string.isRequired,
};

export default ItemStats;

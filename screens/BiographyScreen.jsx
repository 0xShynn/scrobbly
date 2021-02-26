import React from "react";
import { View, ScrollView } from "react-native";
import PropTypes from "prop-types";

import CustomText from "../components/UI/CustomText";
import myColors from "../constants/myColors";
import spacing from "../constants/spacing";
import useColorScheme from "../hooks/useColorSchemeFix";

const BiographyScreen = ({ route }) => {
  const { biography } = route.params;
  const isDarkTheme = useColorScheme() === "dark";
  return (
    <ScrollView
      style={{
        backgroundColor: isDarkTheme ? myColors.gray_1100 : myColors.gray_100,
        flex: 1,
      }}
    >
      <View style={{ padding: spacing.xl }}>
        <CustomText size="H6" color={isDarkTheme ? "white" : myColors.gray_900}>
          {biography}
        </CustomText>
      </View>
    </ScrollView>
  );
};

BiographyScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

export default BiographyScreen;

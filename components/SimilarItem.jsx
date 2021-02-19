import React from "react";
import { View, Image } from "react-native";
import PropTypes from "prop-types";
import TouchableItem from "./TouchableItem";
import CustomText from "./UI/CustomText";
import myColors from "../constants/myColors";
import spacing from "../constants/spacing";
import abbreviateNumber from "../utils/numbers";
import useColorScheme from "../hooks/useColorSchemeFix";

const SimilarItem = ({ onPress, image, title, subtitle, playcount }) => {
  const isDarkTheme = useColorScheme() === "dark";

  return (
    <TouchableItem onPress={onPress} style={{ marginBottom: 10 }}>
      <Image
        source={{ uri: image }}
        style={{
          width: 60,
          height: 60,
          borderRadius: 4,
          marginRight: spacing.md,
        }}
      />
      <View style={{ flex: 1 }}>
        <CustomText
          size="H6"
          color={isDarkTheme ? "white" : myColors.gray_900}
          bold
          complementaryStyle={{ marginBottom: 2 }}
          numberOfLines={2}
        >
          {title}
        </CustomText>

        {subtitle ? (
          <CustomText
            size="H6"
            color={isDarkTheme ? myColors.gray_300 : myColors.gray_600}
          >
            {subtitle}
          </CustomText>
        ) : null}
      </View>
      {playcount ? (
        <View style={{ marginLeft: 10 }}>
          <CustomText
            size="H7"
            color={isDarkTheme ? "white" : myColors.gray_700}
          >
            {abbreviateNumber(playcount)}
          </CustomText>
        </View>
      ) : null}
    </TouchableItem>
  );
};

SimilarItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  playcount: PropTypes.string.isRequired,
};

export default SimilarItem;

import React from "react";
import PropTypes from "prop-types";
import { Image, View } from "react-native";
import myColors from "../constants/myColors";
import useColorScheme from "../hooks/useColorSchemeFix";
import CustomText from "./UI/CustomText";

const DetailsHeader = ({ style, image, title, subtitle }) => {
  const isDarkTheme = useColorScheme() === "dark";

  return (
    <View
      style={{
        alignItems: "center",
        paddingHorizontal: 40,
        paddingTop: 40,
        ...style,
      }}
    >
      <View
        style={{
          shadowColor: "black",
          shadowRadius: 10,
          shadowOffset: { width: 3, height: 6 },
          shadowOpacity: 0.2,
        }}
      >
        <Image
          source={{ uri: image }}
          style={{
            width: 200,
            height: 200,
            borderRadius: 6,
            overflow: "hidden",
            marginBottom: 20,
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <CustomText
          size="H3"
          color={isDarkTheme ? "white" : myColors.gray_900}
          bold
          complementaryStyle={{ textAlign: "center" }}
          numberOfLines={2}
        >
          {title}
        </CustomText>
        <CustomText
          size="H4"
          color={isDarkTheme ? "white" : myColors.gray_900}
          complementaryStyle={{ textAlign: "center", marginTop: 4 }}
          numberOfLines={2}
        >
          {subtitle}
        </CustomText>
      </View>
    </View>
  );
};

DetailsHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

DetailsHeader.defaultProps = {
  style: {},
};

export default DetailsHeader;

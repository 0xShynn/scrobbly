/* eslint-disable global-require */
import React from "react";
import { View, Image } from "react-native";
import PropTypes from "prop-types";
import LottieView from "lottie-react-native";
import dayjs from "dayjs";

import TouchableItem from "./TouchableItem";
import CustomText from "./UI/CustomText";

import myColors from "../constants/myColors";
import spacing from "../constants/spacing";
import useColorScheme from "../hooks/useColorSchemeFix";
// eslint-disable-next-line no-unused-vars
import updatedLocale from "../utils/dayjs";

const ListItem = ({
  onPress,
  date,
  rank,
  isLoading,
  isRefreshing,
  image,
  title,
  subtitle,
  playcount,
  nowPlaying,
}) => {
  const timestamp = dayjs(date).utc(true).fromNow();
  const isDarkTheme = useColorScheme() === "dark";

  return (
    <TouchableItem onPress={onPress}>
      {rank ? (
        <View>
          <CustomText
            size="H3"
            color={isDarkTheme ? "white" : myColors.gray_900}
            bold
            complementaryStyle={{
              textAlign: "center",
              minWidth: 26,
              marginRight: 10,
            }}
          >
            {rank}
          </CustomText>
        </View>
      ) : null}
      <View>
        <View
          style={{
            position: "relative",
            width: 60,
            height: 60,
            marginRight: spacing.sm,
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          {isLoading && !isRefreshing ? (
            <View
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0, 0.5)",
                zIndex: 1,
              }}
            />
          ) : null}

          <Image
            source={{ uri: image }}
            style={{
              width: 60,
              height: 60,
              position: "absolute",
            }}
          />
        </View>
      </View>

      <View style={{ flex: 1, paddingRight: spacing.md }}>
        <CustomText
          size="H6"
          color={isDarkTheme ? "white" : myColors.gray_900}
          bold
          numberOfLines={2}
          complementaryStyle={{ marginBottom: 2 }}
        >
          {title}
        </CustomText>
        <CustomText
          size="H6"
          color={isDarkTheme ? myColors.gray_300 : myColors.gray_900}
        >
          {subtitle}
        </CustomText>

        {playcount ? (
          <CustomText
            size="H7"
            color={isDarkTheme ? myColors.gray_400 : myColors.gray_500}
            complementaryStyle={{ marginTop: 3 }}
          >
            {playcount} scrobbles
          </CustomText>
        ) : null}
      </View>
      {date ? (
        <CustomText size="H7" color={myColors.gray_500}>
          {timestamp}
        </CustomText>
      ) : null}
      {nowPlaying ? (
        <LottieView
          source={
            isDarkTheme
              ? require("../assets/lottiefiles/now-playing-dark.json")
              : require("../assets/lottiefiles/now-playing-light.json")
          }
          autoPlay
          loop
          style={{
            width: 24,
            height: 24,
            marginBottom: 10,
          }}
        />
      ) : null}
    </TouchableItem>
  );
};

ListItem.propTypes = {
  onPress: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  date: PropTypes.string,
  rank: PropTypes.string,
  nowPlaying: PropTypes.bool,
  playcount: PropTypes.string,
  isLoading: PropTypes.bool,
  isRefreshing: PropTypes.bool,
};

ListItem.defaultProps = {
  date: "",
  rank: "",
  playcount: "",
  nowPlaying: false,
  isLoading: false,
  isRefreshing: false,
};

export default ListItem;

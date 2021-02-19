/* eslint-disable no-use-before-define */
import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import PropTypes from "prop-types";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "./UI/CustomText";
import myColors from "../constants/myColors";
import spacing from "../constants/spacing";

const ListItemCover = ({
  title,
  subtitle,
  image,
  playcount,
  onSelect,
  isLoading,
  isRefreshing,
}) => {
  const itemCoverHeight = (useWindowDimensions().width - spacing.lg * 2) / 2;

  return (
    <TouchableWithoutFeedback style={styles.itemCover} onPress={onSelect}>
      <ImageBackground
        source={{ uri: image }}
        style={{
          width: "100%",
          height: itemCoverHeight,
          flex: 1,
          borderRadius: 10,
          marginHorizontal: 6,
          overflow: "hidden",
        }}
      >
        {isLoading && !isRefreshing ? (
          <View
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              backgroundColor: "rgba(0,0,0, 0.5)",
              zIndex: 1,
            }}
          />
        ) : null}
        <TouchableWithoutFeedback onPress={onSelect}>
          <View style={styles.listItem}>
            <LinearGradient
              colors={[
                "transparent",
                "rgba(0,0,0,0.2)",
                "rgba(0,0,0,0.5)",
                "rgba(0,0,0,0.7)",
                "rgba(0,0,0,0.8)",
              ]}
              style={styles.itemGradientInfo}
            />
            <View style={styles.itemPlaycountContainer}>
              <Ionicons
                name="ios-musical-notes"
                size={20}
                color="white"
                style={styles.itemIcon}
              />
              <CustomText
                size="H3"
                bold
                color="white"
                complementaryStyle={{ marginLeft: 8 }}
              >
                {playcount}
              </CustomText>
            </View>
            <CustomText size="H5" bold color="white" numberOfLines={1}>
              {title}
            </CustomText>

            {subtitle && (
              <CustomText
                size="H6"
                bold
                color={myColors.gray_300}
                numberOfLines={1}
              >
                {subtitle}
              </CustomText>
            )}
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

ListItemCover.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  playcount: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  subtitle: PropTypes.string,
  isLoading: PropTypes.bool,
  isRefreshing: PropTypes.bool,
};

ListItemCover.defaultProps = {
  subtitle: null,
  isLoading: false,
  isRefreshing: false,
};

export default ListItemCover;

const styles = StyleSheet.create({
  itemCover: {
    width: "100%",
    height: "100%",
  },
  listImageBackground: {
    width: "100%",
    height: 180,
    flex: 1,
    borderRadius: 10,
    marginHorizontal: 6,
    overflow: "hidden",
  },
  listItem: {
    flex: 1,
    padding: 15,
    width: "100%",
    position: "absolute",
    left: 0,
    bottom: 0,
  },
  itemGradientInfo: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
    flex: 1,
  },
  itemPlaycountContainer: {
    flexDirection: "row",
    marginBottom: 4,
  },
  itemIcon: {
    alignSelf: "center",
  },
});

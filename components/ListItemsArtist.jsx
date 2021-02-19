import React from "react";
import { View, ImageBackground, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";
import spacing from "../constants/spacing";
import CustomText from "./UI/CustomText";

const ListItemsArtist = ({ onPress, index, itemsNumber, image, title }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          paddingLeft: index === 0 ? spacing.md : 0,
          paddingRight: index === itemsNumber - 1 ? spacing.md : 0,
        }}
      >
        <ImageBackground
          source={{ uri: image }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <LinearGradient
            colors={[
              "transparent",
              "rgba(0,0,0,0.2)",
              "rgba(0,0,0,0.5)",
              "rgba(0,0,0,0.8)",
            ]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 100,
              flex: 1,
            }}
          />
          <CustomText
            size="H5"
            color="white"
            bold
            complementaryStyle={{
              padding: 10,
              position: "absolute",
              bottom: 0,
            }}
            numberOfLines={1}
          >
            {title}
          </CustomText>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

ListItemsArtist.propTypes = {
  onPress: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  itemsNumber: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ListItemsArtist;

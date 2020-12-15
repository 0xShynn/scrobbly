import React from 'react'
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import CustomText from './UI/CustomText'
import { Ionicons } from '@expo/vector-icons'
import myColors from '../constants/myColors'

const ListItemCover = (props) => {
  return (
    <TouchableWithoutFeedback style={styles.itemCover} onPress={props.onSelect}>
      <ImageBackground
        source={{ uri: props.image }}
        style={styles.listImageBackground}
      >
        {props.isLoading && !props.isRefreshing ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0, 0.5)',
              zIndex: 1,
            }}
          />
        ) : null}
        <TouchableWithoutFeedback onPress={props.onSelect}>
          <View style={styles.listItem}>
            <LinearGradient
              colors={[
                'transparent',
                'rgba(0,0,0,0.2)',
                'rgba(0,0,0,0.5)',
                'rgba(0,0,0,0.7)',
                'rgba(0,0,0,0.8)',
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
                children={props.playcount}
                size="H3"
                bold
                complementaryStyle={{ marginLeft: 8 }}
              />
            </View>
            <CustomText
              children={props.title}
              size="H5"
              bold
              numberOfLines={1}
            />

            {props.subtitle && (
              <CustomText
                children={props.subtitle}
                size="H6"
                bold
                color={myColors.gray_300}
                numberOfLines={1}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </TouchableWithoutFeedback>
  )
}

export default ListItemCover

const styles = StyleSheet.create({
  itemCover: {
    width: '100%',
    height: '100%',
  },
  listImageBackground: {
    width: '100%',
    height: 180,
    flex: 1,
    borderRadius: 10,
    marginHorizontal: 6,
    overflow: 'hidden',
  },
  listItem: {
    flex: 1,
    padding: 15,
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  itemGradientInfo: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
    flex: 1,
  },
  itemPlaycountContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  itemIcon: {
    alignSelf: 'center',
  },
})

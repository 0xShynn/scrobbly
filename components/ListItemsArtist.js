import React from 'react'
import { View, ImageBackground, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import spacing from '../constants/spacing'
import CustomText from './UI/CustomText'

const ListItemsArtist = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          paddingLeft: props.index === 0 ? spacing.md : 0,
          paddingRight: props.index === props.itemsNumber - 1 ? spacing.md : 0,
        }}
      >
        <ImageBackground
          source={{ uri: props.image }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 10,
            overflow: 'hidden',
          }}
        >
          <LinearGradient
            colors={[
              'transparent',
              'rgba(0,0,0,0.2)',
              'rgba(0,0,0,0.5)',
              'rgba(0,0,0,0.8)',
            ]}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 100,
              flex: 1,
            }}
          />
          <CustomText
            children={props.title}
            size="H5"
            color="white"
            bold
            complementaryStyle={{
              padding: 10,
              position: 'absolute',
              bottom: 0,
            }}
            numberOfLines={1}
          />
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )
}

export default ListItemsArtist

import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { View, ImageBackground, TouchableOpacity } from 'react-native'
import { TitleH5 } from './UI/Typography'

const ListItemsArtist = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          paddingLeft: props.index === 0 ? 20 : 0,
          paddingRight: props.index === props.itemsNumber - 1 ? 20 : 0,
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
          <TitleH5
            style={{ padding: 10, position: 'absolute', bottom: 0 }}
            numberOfLines={1}
          >
            {props.title}
          </TitleH5>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )
}

export default ListItemsArtist

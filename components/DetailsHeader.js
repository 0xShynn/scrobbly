import React from 'react'
import { View, Image } from 'react-native'
import { TitleH3, TextH4 } from './UI/Typography'

const DetailsHeader = (props) => {
  return (
    <View
      style={{
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingTop: 40,
        ...props.style,
      }}
    >
      <Image
        source={{ uri: props.image }}
        style={{
          width: 200,
          height: 200,
          borderRadius: 6,
          overflow: 'hidden',
          marginBottom: 20,
        }}
      />
      <View style={{ flex: 1 }}>
        <TitleH3
          style={{ color: 'white', textAlign: 'center' }}
          numberOfLines={2}
          children={props.title}
        />
        <TextH4
          style={{ marginTop: 4, color: 'white', textAlign: 'center' }}
          numberOfLines={2}
          children={props.subtitle}
        />
      </View>
    </View>
  )
}

export default DetailsHeader

import React from 'react'
import { Image, View } from 'react-native'
import myColors from '../constants/myColors'
import useColorScheme from '../hooks/useColorSchemeFix'
import CustomText from './UI/CustomText'

const DetailsHeader = (props) => {
  const isDarkTheme = useColorScheme() === 'dark' ? true : false

  return (
    <View
      style={{
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingTop: 40,
        ...props.style,
      }}
    >
      <View
        style={{
          shadowColor: 'black',
          shadowRadius: 10,
          shadowOffset: { width: 3, height: 6 },
          shadowOpacity: 0.2,
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
      </View>
      <View style={{ flex: 1 }}>
        <CustomText
          children={props.title}
          size="H3"
          color={isDarkTheme ? 'white' : myColors.cool_gray_900}
          bold
          complementaryStyle={{ textAlign: 'center' }}
          numberOfLines={2}
        />
        <CustomText
          children={props.subtitle}
          size="H4"
          color={isDarkTheme ? 'white' : myColors.cool_gray_900}
          complementaryStyle={{ textAlign: 'center', marginTop: 4 }}
          numberOfLines={2}
        />
      </View>
    </View>
  )
}

export default DetailsHeader

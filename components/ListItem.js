import React from 'react'
import { View, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { updatedLocale } from '../utils/dayjs'
import TouchableItem from './TouchableItem'
import CustomText from './UI/CustomText'
import myColors from '../constants/myColors'
import spacing from '../constants/spacing'
import useColorScheme from '../hooks/useColorSchemeFix'
import LottieView from 'lottie-react-native'

const ListItem = (props) => {
  const timestamp = dayjs(props.date).utc(true).fromNow()
  const isDarkTheme = useColorScheme() === 'dark' ? true : false

  return (
    <TouchableItem onPress={props.onPress}>
      {props.rank ? (
        <View>
          <CustomText
            size="H3"
            color={isDarkTheme ? 'white' : myColors.gray_900}
            bold
            complementaryStyle={{
              textAlign: 'center',
              minWidth: 26,
              marginRight: 10,
            }}
          >
            {props.rank}
          </CustomText>
        </View>
      ) : null}
      <View>
        <View
          style={{
            position: 'relative',
            width: 60,
            height: 60,
            marginRight: spacing.sm,
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          {props.isLoading && !props.isRefreshing ? (
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0, 0.5)',
                zIndex: 1,
              }}
            />
          ) : null}

          <Image
            source={{ uri: props.image }}
            style={{
              width: 60,
              height: 60,
              position: 'absolute',
            }}
          />
        </View>
      </View>

      <View style={{ flex: 1, paddingRight: spacing.md }}>
        <CustomText
          children={props.title}
          size="H6"
          color={isDarkTheme ? 'white' : myColors.gray_900}
          bold
          numberOfLines={2}
          complementaryStyle={{ marginBottom: 2 }}
        />
        <CustomText
          children={props.subtitle}
          size="H6"
          color={isDarkTheme ? myColors.gray_300 : myColors.gray_900}
        />

        {props.playcount ? (
          <CustomText
            size="H7"
            color={isDarkTheme ? myColors.gray_400 : myColors.gray_500}
            complementaryStyle={{ marginTop: 3 }}
          >
            {props.playcount} scrobbles
          </CustomText>
        ) : null}
      </View>
      {props.date ? (
        <CustomText size="H7" color={myColors.gray_500}>
          {timestamp}
        </CustomText>
      ) : null}
      {/* {props.nowPlaying ? <CustomText size="H7">Now Playing</CustomText> : null} */}
      {props.nowPlaying ? (
        <LottieView
          source={
            isDarkTheme
              ? require('../assets/lottiefiles/now-playing-dark.json')
              : require('../assets/lottiefiles/now-playing-light.json')
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
  )
}

export default ListItem

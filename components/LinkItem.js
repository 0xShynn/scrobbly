import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import myColors from '../constants/myColors'
import spacing from '../constants/spacing'
import useColorScheme from '../hooks/useColorSchemeFix'
import CustomText from './UI/CustomText'
import { Ionicons } from '@expo/vector-icons'

const LinkItem = (props) => {
  const isDarkTheme = useColorScheme() === 'dark' ? true : false

  return (
    <Pressable
      onPress={props.onPress}
      style={({ pressed }) => [
        {
          backgroundColor: isDarkTheme
            ? pressed
              ? myColors.gray_950
              : myColors.gray_1050
            : pressed
            ? myColors.gray_200
            : 'white',
          padding: spacing.lg,
          borderBottomWidth: 1,
          borderBottomColor: isDarkTheme
            ? myColors.gray_950
            : myColors.gray_100,
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
        },
      ]}
    >
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <CustomText
          size="H6"
          color={isDarkTheme ? myColors.gray_200 : myColors.gray_900}
        >
          {props.children}
        </CustomText>
      </View>
      {props.type !== 'signout' ? (
        <View style={{ paddingLeft: spacing.sm }}>
          <Ionicons
            name="ios-arrow-forward"
            size={20}
            color={isDarkTheme ? myColors.gray_500 : myColors.gray_400}
          />
        </View>
      ) : null}
    </Pressable>
  )
}

export default LinkItem

const styles = StyleSheet.create({})

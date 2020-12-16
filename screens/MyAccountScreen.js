import React from 'react'
import { Image, View, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import * as authActions from '../store/authActions'

import CustomText from '../components/UI/CustomText'
import LinkItem from '../components/LinkItem'

import myColors from '../constants/myColors'
import spacing from '../constants/spacing'
import useColorScheme from '../hooks/useColorSchemeFix'

const MyAccountScreen = ({ route }) => {
  const dispatch = useDispatch()
  const isDarkTheme = useColorScheme() === 'dark' ? true : false
  const { userData } = route.params

  const signOutHandler = async () => {
    dispatch(authActions.logOut())
  }

  return (
    <ScrollView
      style={{
        backgroundColor: isDarkTheme ? myColors.gray_1100 : myColors.gray_100,
      }}
    >
      <View>
        {userData ? (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              padding: spacing.lg,
              backgroundColor: isDarkTheme ? myColors.gray_1050 : 'white',
              borderBottomWidth: 1,
              borderBottomColor: isDarkTheme
                ? myColors.gray_950
                : myColors.gray_200,
              marginBottom: 40,
            }}
          >
            <Image
              source={{ uri: userData.image }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
              }}
            />
            <View
              style={{
                flex: 1,
                marginLeft: spacing.lg,
              }}
            >
              <CustomText
                children={userData.name}
                size="H3"
                bold
                color={isDarkTheme ? 'white' : myColors.gray_900}
                complementaryStyle={{ marginBottom: 4 }}
              />
              <CustomText
                children={userData.playcount + ' scrobbles'}
                size="H6"
                color={isDarkTheme ? myColors.gray_500 : myColors.gray_1000}
              />
            </View>
          </View>
        ) : null}

        <View
          style={{
            marginBottom: 40,
            borderTopWidth: 1,
            borderTopColor: isDarkTheme ? myColors.gray_950 : myColors.gray_100,
          }}
        >
          <LinkItem>About this version</LinkItem>
          <LinkItem>Terms of Use</LinkItem>
          <LinkItem>Privacy Policy</LinkItem>
        </View>

        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: isDarkTheme ? myColors.gray_950 : myColors.gray_100,
          }}
        >
          <LinkItem onPress={signOutHandler} type="signout">
            Sign out
          </LinkItem>
        </View>
      </View>
    </ScrollView>
  )
}

export default MyAccountScreen

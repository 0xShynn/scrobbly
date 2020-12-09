import React, { useEffect, useState } from 'react'
import { Image, View, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import CustomButton from '../components/UI/CustomButton'
import CustomText from '../components/UI/CustomText'
import myColors from '../constants/myColors'
import spacing from '../constants/spacing'

import { useDispatch } from 'react-redux'
import * as authActions from '../store/authActions'

const MyAccountScreen = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState()

  const logOutHandler = async () => {
    dispatch(authActions.logOut())
  }

  useEffect(() => {
    const fetchData = async () => {
      const { userInfo } = await AsyncStorage.getItem('userData').then((res) =>
        JSON.parse(res)
      )
      setData(userInfo)
    }
    fetchData()
  }, [])

  return (
    <ScrollView style={{ backgroundColor: myColors.dark_gray }}>
      <View
        style={{
          backgroundColor: myColors.dark_gray,
          flex: 1,
          paddingVertical: 40,
          paddingHorizontal: spacing.lg,
        }}
      >
        {data ? (
          <View style={{ alignItems: 'center', flex: 1 }}>
            <Image
              source={{ uri: data.image }}
              style={{
                width: 160,
                height: 160,
                borderRadius: 80,
                marginBottom: spacing.lg,
              }}
            />
            <CustomText size="H2" bold style={{ marginBottom: spacing.lg }}>
              {data.realname}
            </CustomText>
          </View>
        ) : null}
        <CustomButton
          label="Logout"
          onPress={logOutHandler}
          color={myColors.primary}
        />
      </View>
    </ScrollView>
  )
}

export default MyAccountScreen

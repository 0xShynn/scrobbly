import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

import CustomButton from '../components/UI/CustomButton'
import { TitleH2 } from '../components/UI/Typography'
import myColors from '../constants/myColors'
import spacing from '../constants/spacing'

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
            <TitleH2 style={{ marginBottom: spacing.lg }}>
              {data.realname}
            </TitleH2>
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

const styles = StyleSheet.create({})

import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
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
    <View
      style={{
        backgroundColor: myColors.dark_gray,
        flex: 1,
        padding: spacing.xl,
      }}
    >
      {data ? (
        <View style={{ alignItems: 'center' }}>
          <Image
            source={{ uri: data.image }}
            style={{
              width: 160,
              height: 160,
              borderRadius: 80,
              marginBottom: 20,
            }}
          />
          <TitleH2 style={{ marginBottom: 20 }}>{data.realname}</TitleH2>
        </View>
      ) : null}
      <CustomButton label="Logout" onPress={logOutHandler} />
    </View>
  )
}

export default MyAccountScreen

const styles = StyleSheet.create({})

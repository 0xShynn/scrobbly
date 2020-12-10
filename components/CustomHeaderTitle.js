import React from 'react'
import { useColorScheme } from 'react-native'
import myColors from '../constants/myColors'
import CustomText from './UI/CustomText'

const CustomHeaderTitle = (props) => {
  const isDarkTheme = useColorScheme() === 'dark' ? true : false
  return (
    <>
      <CustomText
        size="H4"
        color={isDarkTheme ? 'white' : myColors.cool_gray_900}
        bold
        complementaryStyle={{ marginRight: 6, marginBottom: 0 }}
      >
        {props.title}
      </CustomText>
      {props.periodSelected && (
        <CustomText
          size="H4"
          color={isDarkTheme ? 'white' : myColors.cool_gray_900}
        >
          {' '}
          /{' '}
          {props.isLoading || props.isRefreshing
            ? 'Loading...'
            : props.periodSelected}
        </CustomText>
      )}
    </>
  )
}

export default CustomHeaderTitle

import React from 'react'
import { ActivityIndicator, useColorScheme } from 'react-native'
import myColors from '../../constants/myColors'
import CenteredContainer from './CenteredContainer'

const LoadingContainer = () => {
  const isDarkTheme = useColorScheme() === 'dark' ? true : false

  return (
    <CenteredContainer
      style={{
        backgroundColor: isDarkTheme
          ? myColors.dark_gray
          : myColors.cool_gray_100,
      }}
    >
      <ActivityIndicator
        size="large"
        color={isDarkTheme ? 'white' : myColors.cool_gray_600}
      />
    </CenteredContainer>
  )
}

export default LoadingContainer

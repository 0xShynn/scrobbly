import React from 'react'
import { ActivityIndicator } from 'react-native'
import CenteredContainer from './CenteredContainer'

const LoadingContainer = () => {
  return (
    <CenteredContainer>
      <ActivityIndicator size="large" color="black" />
    </CenteredContainer>
  )
}

export default LoadingContainer

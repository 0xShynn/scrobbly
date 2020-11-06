import React from 'react'
import { ActivityIndicator } from 'react-native'
import CenteredContainer from './CenteredContainer'

const LoadingContainer = () => {
  return (
    <CenteredContainer>
      <ActivityIndicator size="large" color="white" />
    </CenteredContainer>
  )
}

export default LoadingContainer

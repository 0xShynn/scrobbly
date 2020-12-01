import React from 'react'
import { ActivityIndicator } from 'react-native'
import CenteredContainer from './CenteredContainer'

const LoadingContainer = (props) => {
  return (
    <CenteredContainer style={props.style}>
      <ActivityIndicator size="large" color="white" />
    </CenteredContainer>
  )
}

export default LoadingContainer

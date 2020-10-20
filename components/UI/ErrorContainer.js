import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CenteredContainer from './CenteredContainer'
import { TextH6, TitleH3 } from './Typography'
import { SimpleLineIcons } from '@expo/vector-icons'
import myColors from '../../constants/myColors'

const ErrorContainer = (props) => {
  return (
    <CenteredContainer style={{ padding: 20 }}>
      <SimpleLineIcons name="support" size={30} color={myColors.primary} />
      <TitleH3
        style={{
          marginVertical: 16,
          color: myColors.primary,
          textAlign: 'center',
        }}
      >
        Oops, something wrong has happened.
      </TitleH3>
      <TextH6 style={{ textAlign: 'center' }}>{props.message}</TextH6>
    </CenteredContainer>
  )
}

export default ErrorContainer

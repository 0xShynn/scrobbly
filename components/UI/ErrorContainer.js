import React from 'react'
import CenteredContainer from './CenteredContainer'
import { TextH6, TitleH3 } from './Typography'
import { SimpleLineIcons } from '@expo/vector-icons'
import myColors from '../../constants/myColors'
import { View } from 'react-native'

const ErrorContainer = (props) => {
  return (
    <CenteredContainer style={{ padding: 30 }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          paddingHorizontal: 30,
          paddingVertical: 60,
          borderRadius: 20,
        }}
      >
        <SimpleLineIcons name="support" size={36} color={myColors.primary} />
        <TitleH3
          style={{
            marginVertical: 16,
            color: myColors.primary,
            textAlign: 'center',
          }}
        >
          Oops, something wrong has happened.
        </TitleH3>
        <TextH6 style={{ textAlign: 'center' }}>{props.error}</TextH6>
      </View>
    </CenteredContainer>
  )
}

export default ErrorContainer

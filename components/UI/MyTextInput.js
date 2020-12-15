import React, { forwardRef } from 'react'
import { TextInput, View } from 'react-native'
import { Ionicons as Icon } from '@expo/vector-icons'
import myColors from '../../constants/myColors'

const MyTextInput = forwardRef(
  ({ icon, error, touched, ...otherProps }, ref) => {
    const validationColor = !touched
      ? myColors.gray_900
      : error
      ? myColors.primary
      : myColors.gray_900

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 8,
          padding: 10,
          borderColor: validationColor,
          borderWidth: 1,
          backgroundColor: 'white',
        }}
      >
        <View style={{ paddingHorizontal: 8 }}>
          <Icon name={icon} color={validationColor} size={20} />
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholderTextColor={myColors.gray_600}
            ref={ref}
            {...otherProps}
          />
        </View>
      </View>
    )
  }
)

export default MyTextInput

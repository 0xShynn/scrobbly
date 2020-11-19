import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import myColors from '../../constants/myColors'
import { Ionicons } from '@expo/vector-icons'

export const TextH2 = (props) => {
  return (
    <Text
      {...props}
      style={{
        ...styles.textWeightRegular,
        ...styles.titleH2,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  )
}

export const TextH3 = (props) => {
  return (
    <Text
      {...props}
      style={{
        ...styles.textWeightRegular,
        ...styles.titleH3,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  )
}

export const TextH4 = (props) => {
  return (
    <Text
      {...props}
      style={{
        ...styles.textWeightRegular,
        ...styles.titleH4,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  )
}

export const TextH5 = (props) => {
  return (
    <Text
      {...props}
      style={{
        ...styles.textWeightRegular,
        ...styles.titleH5,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  )
}

export const TextH6 = (props) => {
  return (
    <Text
      {...props}
      style={{
        ...styles.textWeightRegular,
        ...styles.titleH6,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  )
}

export const TitleH1 = (props) => {
  return (
    <Text
      {...props}
      style={{
        ...styles.textWeightBold,
        ...styles.titleH1,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  )
}

export const TitleH2 = (props) => {
  return (
    <Text
      {...props}
      style={{
        ...styles.textWeightBold,
        ...styles.titleH2,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  )
}

export const TitleH3 = (props) => {
  return (
    <Text
      {...props}
      style={{
        ...styles.textWeightBold,
        ...styles.titleH3,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  )
}

export const TitleH4 = (props) => {
  return (
    <Text
      {...props}
      style={{
        ...styles.textWeightBold,
        ...styles.titleH4,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  )
}

export const TitleH5 = (props) => {
  return (
    <Text
      {...props}
      style={{
        ...styles.textWeightBold,
        ...styles.titleH5,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  )
}

export const TitleH6 = (props) => {
  return (
    <Text
      {...props}
      style={{
        ...styles.textWeightBold,
        ...styles.titleH6,
        ...props.style,
      }}
    >
      {props.children}
    </Text>
  )
}

export const DetailsTitle = (props) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        ...props.style,
      }}
    >
      <Ionicons
        name="md-arrow-dropright"
        size={24}
        color={myColors.cool_gray_600}
      />

      <TitleH4
        style={{
          fontFamily: 'Inter_400Regular',
          color: myColors.cool_gray_400,
          marginLeft: 10,
        }}
      >
        {props.children}
      </TitleH4>
    </View>
  )
}

const styles = StyleSheet.create({
  textWeightRegular: {
    fontFamily: 'Inter_400Regular',
    color: 'white',
  },
  textWeightBold: {
    fontFamily: 'Inter_700Bold',
    color: 'white',
  },
  titleH1: {
    fontSize: 30,
  },
  titleH2: {
    fontSize: 24,
  },
  titleH3: {
    fontSize: 20,
  },
  titleH4: {
    fontSize: 18,
  },
  titleH5: {
    fontSize: 16,
  },
  titleH6: {
    fontSize: 14,
  },
})

import React from 'react'
import { StyleSheet, Text } from 'react-native'
import myColors from '../../constants/myColors'

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
    <TitleH4
      style={{
        marginBottom: 12,
        textTransform: 'uppercase',
        fontFamily: 'Inter_400Regular',
        color: myColors.blue_gray_700,
      }}
    >
      {props.children}
    </TitleH4>
  )
}

const styles = StyleSheet.create({
  textWeightRegular: {
    fontFamily: 'Inter_400Regular',
    color: myColors.blue_gray_990,
  },
  textWeightBold: {
    fontFamily: 'Inter_700Bold',
    color: myColors.blue_gray_990,
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

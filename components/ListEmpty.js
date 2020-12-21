import React from 'react'
import myColors from '../constants/myColors'
import useColorScheme from '../hooks/useColorSchemeFix'
import CenteredContainer from './UI/CenteredContainer'
import CustomText from './UI/CustomText'

const ListEmpty = () => {
  const isDarkTheme = useColorScheme() === 'dark' ? true : false
  return (
    <CenteredContainer>
      <CustomText
        size="H5"
        color={isDarkTheme ? myColors.gray_200 : myColors.gray_900}
      >
        No music was found. Start scrobbling.
      </CustomText>
    </CenteredContainer>
  )
}

export default ListEmpty

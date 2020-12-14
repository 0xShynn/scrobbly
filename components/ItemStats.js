import React from 'react'
import { Dimensions } from 'react-native'
import RoundedContainer from './UI/RoundedContainer'
import Counter from './UI/Counter'
import spacing from '../constants/spacing'
import myColors from '../constants/myColors'
import { abbreviateNumber } from '../utils/numbers'
import useColorScheme from '../hooks/useColorSchemeFix'

const ItemStats = ({ playcount, listeners, userplaycount, topPlaycount }) => {
  const deviceWidth = Dimensions.get('window').width
  const isDarkTheme = useColorScheme() === 'dark' ? true : false

  return (
    <RoundedContainer
      style={{
        flex: 1,
        flexWrap: deviceWidth < 380 ? 'no-wrap' : 'wrap',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginBottom: spacing.md,
        backgroundColor: isDarkTheme
          ? myColors.dark_gray
          : myColors.cool_gray_100,
        borderColor: isDarkTheme ? myColors.light_gray : myColors.cool_gray_400,
        borderWidth: 1,
        padding: deviceWidth < 380 ? spacing.sm : spacing.md,
      }}
    >
      <Counter
        title="Scrobbles"
        icon="ios-globe"
        value={abbreviateNumber(playcount)}
      />
      <Counter
        title="Listeners"
        icon="md-person"
        value={abbreviateNumber(listeners)}
      />
      <Counter
        title="Your scrobbles"
        icon="ios-musical-notes"
        value={topPlaycount ? topPlaycount : userplaycount}
      />
    </RoundedContainer>
  )
}

export default ItemStats

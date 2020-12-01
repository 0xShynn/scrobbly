import React from 'react'
import RoundedContainer from './UI/RoundedContainer'
import Counter from './UI/Counter'
import spacing from '../constants/spacing'
import myColors from '../constants/myColors'
import { abbreviateNumber } from '../utils/numbers'
import { Dimensions } from 'react-native'

const ItemStats = ({ playcount, listeners, userplaycount, topPlaycount }) => {
  const deviceWidth = Dimensions.get('window').width
  return (
    <RoundedContainer
      style={{
        flex: 1,
        flexWrap: deviceWidth < 380 ? 'no-wrap' : 'wrap',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginBottom: spacing.md,
        backgroundColor: myColors.dark_gray,
        borderColor: myColors.light_gray,
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

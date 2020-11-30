import React from 'react'
import spacing from '../constants/spacing'
import { abbreviateNumber } from '../utils/numbers'
import Counter from './UI/Counter'
import RoundedContainer from './UI/RoundedContainer'
import myColors from '../constants/myColors'

const ItemStats = ({ playcount, listeners, userplaycount, topPlaycount }) => {
  return (
    <RoundedContainer
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        marginBottom: spacing.md,
        backgroundColor: myColors.dark_gray,
        borderColor: myColors.light_gray,
        borderWidth: 1,
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

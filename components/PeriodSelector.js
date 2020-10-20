import React from 'react'
import { HiddenItem, OverflowMenu } from 'react-navigation-header-buttons'
import { AntDesign } from '@expo/vector-icons'
import { periods } from '../utils/lastfm'

const PeriodSelector = (props) => {
  return (
    <OverflowMenu
      style={{ marginHorizontal: 10 }}
      OverflowIcon={<AntDesign name="calendar" size={22} color="white" />}
    >
      {periods.map((item) => {
        return (
          <HiddenItem
            key={Math.random()}
            title={item.name}
            onPress={() => props.onSelect(item)}
          />
        )
      })}
    </OverflowMenu>
  )
}

export default PeriodSelector

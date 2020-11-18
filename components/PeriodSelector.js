import React from 'react'
import {
  HiddenItem,
  OverflowMenu,
  overflowMenuPressHandlerDropdownMenu,
} from 'react-navigation-header-buttons'
import { SimpleLineIcons } from '@expo/vector-icons'
import { periods } from '../utils/lastfm'

const PeriodSelector = (props) => {
  return (
    <OverflowMenu
      onPress={overflowMenuPressHandlerDropdownMenu}
      style={{ marginHorizontal: 10 }}
      OverflowIcon={<SimpleLineIcons name="calendar" size={24} color="white" />}
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

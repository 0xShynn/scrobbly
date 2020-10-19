import React from 'react'
import {
  HiddenItem,
  OverflowMenu,
  HeaderButtons,
} from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import { periods } from '../utils/lastfm'

const IoniconsHeaderButton = (props) => (
  <HeaderButton
    IconComponent={Ionicons}
    iconSize={23}
    color="blue"
    {...props}
  />
)

const PeriodSelector = (props) => {
  return (
    <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
      <OverflowMenu
        style={{ marginHorizontal: 10 }}
        OverflowIcon={<Ionicons name="ios-more" size={23} color="white" />}
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
    </HeaderButtons>
  )
}

export default PeriodSelector

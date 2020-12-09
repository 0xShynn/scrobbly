import React from 'react'
import CustomText from './UI/CustomText'

const CustomHeaderTitle = (props) => {
  return (
    <>
      <CustomText
        size="H4"
        color="white"
        bold
        complementaryStyle={{ marginRight: 6, marginBottom: 0 }}
      >
        {props.title}
      </CustomText>
      {props.periodSelected && (
        <CustomText size="H4" color="white">
          {' '}
          /{' '}
          {props.isLoading || props.isRefreshing
            ? 'Loading...'
            : props.periodSelected}
        </CustomText>
      )}
    </>
  )
}

export default CustomHeaderTitle

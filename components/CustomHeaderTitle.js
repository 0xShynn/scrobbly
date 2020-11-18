import React from 'react'
import { TextH4, TitleH4 } from './UI/Typography'

const CustomHeaderTitle = (props) => {
  return (
    <>
      <TitleH4 style={{ color: 'white', marginRight: 6, marginBottom: 0 }}>
        {props.title}
      </TitleH4>
      {props.periodSelected && (
        <TextH4 style={{ color: 'white' }}> / {props.periodSelected}</TextH4>
      )}
    </>
  )
}

export default CustomHeaderTitle

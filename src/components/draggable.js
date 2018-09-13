import React from 'react'
import MediaQuery from 'react-responsive'
import {Small} from '../global-variables'
import ReactDraggable from 'react-draggable'

export default ({ children}) => (
  <MediaQuery query={Small}>
    {(matches) => {
      if (matches) {
        return <ReactDraggable disabled={true} position={{x:0, y:0}}>{children}</ReactDraggable>
      } else {
        return <ReactDraggable>{children}</ReactDraggable>
      }
    }}
  </MediaQuery>
)

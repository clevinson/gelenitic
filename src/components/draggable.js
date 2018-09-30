import React from 'react'
import MediaQuery from 'react-responsive'
import {Small} from '../global-variables'
import ReactDraggable from 'react-draggable'
import styled from 'styled-components'

const StyledDraggableContainer = styled.div`
  cursor: move;

  @media only screen and ${Small} {
    cursor: inherit;
  }
`


export default ({children}) => (
  <StyledDraggableContainer>
    <MediaQuery query={Small}>
      {(matches) => {
        const props = matches && {disabled: true, position: {x: 0, y: 0}}
        return <ReactDraggable {...props}>{children}</ReactDraggable>
      }}
    </MediaQuery>
  </StyledDraggableContainer>
)

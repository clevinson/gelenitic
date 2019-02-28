import React from 'react'
import MediaQuery from 'react-responsive'
import {SmallMediaQuery} from '../global-variables'
import ReactDraggable from 'react-draggable'
import styled from 'styled-components'

const StyledDraggableContainer = styled.div`
  cursor: move;

  @media only screen and ${SmallMediaQuery} {
    cursor: inherit;
  }
`


export default ({children}) => (
  <StyledDraggableContainer>
    <MediaQuery query={SmallMediaQuery}>
      {(matches) => {
        const props = matches && {disabled: true, position: {x: 0, y: 0}}
        return <ReactDraggable {...props}>{children}</ReactDraggable>
      }}
    </MediaQuery>
  </StyledDraggableContainer>
)

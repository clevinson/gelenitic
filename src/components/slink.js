import Link from "gatsby-link"
import styled from "styled-components"

const Slink = styled(Link)`
:link, :visited, :active {
  text-decoration: none;
  text-transform: uppercase;
  color: #000;
  transition: all .5s linear 1ms;
}
:hover {
  color: #fff;
  transition: all 5s linear 1ms;
  text-decoration: underline;
}
`

export default Slink

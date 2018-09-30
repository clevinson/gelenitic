import { Link as GatsbyLink } from "gatsby"
import React from 'react'
import styled from "styled-components"

const Link = ({ children, to, ...other }) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to)

  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    return (
      <GatsbyLink to={to} {...other}>
        {children}
      </GatsbyLink>
    )
  }
  return (
    <a href={to} {...other}>
      {children}
    </a>
  )
}


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
const Sa = styled.a`
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

export { Slink, Link, Sa }

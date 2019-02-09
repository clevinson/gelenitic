import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../../components/layout'
import styled from 'styled-components'
import CryptoJS from 'crypto-js'


const PageContainer = styled.div`
  .back {
    background-image: url('/assets/WIP006/art-1.jpeg');
      top: 0px;
      left: 0px;
      height: 100%;
      width: 100%;
      position: fixed;
  }

  .overlay {
      height: 100%;
      width: 100%;
      position: fixed;
      overflow: auto;
      top: 0px;
      left: 0px;
      background: rgba(255, 255, 255, 0.7); /*can be anything, of course*/
  }

  footer {
    background-color: rgba(0,0,0,0);
  }

  li {
    font-size: 1.5em;
    line-height: 4em;
    list-style-type: none;
    border-bottom: 2px solid black;
    margin-right: 40px;
    position: relative;
  }
  span {
    float: right;
  }
`

const tracks = [
    { title: "申"
    , hash: "0xA4546278bAA051cc7C90F37F697a83aa9C18C824"
    }
  , { title: "dádiva (prelude)"
    , hash: "0xA4546278bAA051cc7C90F37F697a83aa9C18C824"
    }
  , { title: "mirror room"
    , hash: "0xA4546278bAA051cc7C90F37F697a83aa9C18C824"
    }
  , { title: "fka drums (interlude)"
    , hash: "0xA4546278bAA051cc7C90F37F697a83aa9C18C824"
    }
  , { title: "kuro-neko"
    , hash: "0xA4546278bAA051cc7C90F37F697a83aa9C18C824"
    }
  , { title: "trails, echoes"
    , hash: "0xA4546278bAA051cc7C90F37F697a83aa9C18C824"
    }
  , { title: "drip lenses"
    , hash: "0xA4546278bAA051cc7C90F37F697a83aa9C18C824"
    }
  , { title: "dádiva"
    , hash: "0xA4546278bAA051cc7C90F37F697a83aa9C18C824"
    }
  , { title: "///'\\"
    , hash: "0xA4546278bAA051cc7C90F37F697a83aa9C18C824"
    }
  , { title: "tea house (drums)"
    , hash: "0xA4546278bAA051cc7C90F37F697a83aa9C18C824"
    }
  , { title: "rodtrip"
    , hash: "0xA4546278bAA051cc7C90F37F697a83aa9C18C824"
    }
  , { title: "fountains"
    , hash: "0xA4546278bAA051cc7C90F37F697a83aa9C18C824"
    }
  , { title: "waking I"
    , hash: "0xA4546278bAA051cc7C90F37F697a83aa9C18C824"
    }
  , { title: "wanderwoods"
    , hash: "0xA4546278bAA051cc7C90F37F697a83aa9C18C824"
    }
  , { title: "midori"
    , hash: "0xA4546278bAA051cc7C90F37F697a83aa9C18C824"
    }
  , { title: "echoes, trails"
    , hash: "0xA4546278bAA051cc7C90F37F697a83aa9C18C824"
    }
  , { title: "ro"
    , hash: "0xA4546278bAA051cc7C90F37F697a83aa9C18C824"
    }
  , { title: "fka drums (rhythms edit)"
    , hash: "0xA4546278bAA051cc7C90F37F697a83aa9C18C824"
    }
  , { title: "fountains II"
    , hash: "0xA4546278bAA051cc7C90F37F697a83aa9C18C824"
    }
  , { title: "turn cycle"
    , hash: "0xA4546278bAA051cc7C90F37F697a83aa9C18C824"
    }
  , { title: "waking II"
    , hash: "0xA4546278bAA051cc7C90F37F697a83aa9C18C824"
    }
  , { title: "maneki-neko"
    , hash: "0xA4546278bAA051cc7C90F37F697a83aa9C18C824"
    }
  , { title: "神"
    , hash: "0xA4546278bAA051cc7C90F37F697a83aa9C18C824"
    }
  , { title: "fka drums (outro)"
    , hash: "0xA4546278bAA051cc7C90F37F697a83aa9C18C824"
    }
  , { title: "田"
    , hash: "0xA4546278bAA051cc7C90F37F697a83aa9C18C824"
    }
]


const HashLine = styled.div`
  width: ${props => props.length}px;
  right: 0%;
  position: absolute;
  border-bottom: 2px solid #6BAE53;
`

const StatsLine = styled.div`
  width: ${props => props.length}px;
  left: 0%;
  position: absolute;
  border-bottom: 2px solid #40B2DA;
`

export default () => (
  <PageContainer>
    <div className="back">
    </div>
    <div className="overlay">
    </div>
    <ul>
    {
      tracks.map((track, i) => {
        let hashLength = Math.random()*800;
        let statsLength = Math.random()*800;

        let hash = "0xc0da5000" + CryptoJS.MD5(track.title).toString()

        return (
          <li key={i}>
            {track.title}
            <span><a href={ "https://etherscan.io/address/" + hash }>{hash}</a></span>
            <StatsLine length={statsLength}/>
            <HashLine length={hashLength}/>
          </li>
        )
      })
    }
    </ul>
  </PageContainer>
)

import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../../components/layout'
import styled from 'styled-components'
import SoundCloudWidget from 'react-simple-soundcloud-widget'



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
  iframe {
    position: fixed;
  }
`

export default () => (
  <PageContainer>
    <div className="back">
    </div>
    <div className="overlay">
    </div>
    <ul> </ul>
    <SoundCloudWidget
      url={"https://soundcloud.com/wetmale/blind-voice&secret_token=s-HjwdU"}
      config={{show_user: false, secret_token: 's-HjwdU'}}
      secret_token={'s-TIzMQ'}
      id={"react-sc-widget"}
    />
  </PageContainer>
)


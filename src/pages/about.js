import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import styled from 'styled-components'

const PageContainer = styled.div`
  footer {
    background-color: rgba(0,0,0,0);
  }
`

export default () => (
  <PageContainer>
    <Helmet>
      <script type="text/javascript" src="js/lib/paper-full.min.js"/>
      <script type="text/paperscript" src="js/about.js" canvas="back-sketch"/>
    </Helmet>
    <Layout>
      <canvas id='back-sketch' resize="both"/>
    </Layout>
  </PageContainer>
)

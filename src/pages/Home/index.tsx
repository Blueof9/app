import React from 'react'
//import styled from 'styled-components'

import logo from '../../assets/images/logobig.png'
import LogoMMS from '../../assets/images/MMSlogo.png'
import wordmark from '../../assets/images/wordmarkbigBlack.png'
import wordmarkWhite from '../../assets/images/wordmarkbigWhite.png'
import Button from '../../components/FarmButton'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'

import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import Slide from './components/Slide'
import Burn from './components/Burn'
import Halving from './components/Halving'
import { useIsDarkMode } from '../../state/user/hooks'

const Home: React.FC = () => {
	const darkMode = useIsDarkMode()
  return (
    <Page>
      <PageHeader icon={darkMode ? LogoMMS : logo} wordmark={darkMode ? wordmarkWhite : wordmark} />

      <Container size="lg">
        <Balances />
      </Container>
	  <Spacer size="lg" />
	  <Halving />
	  <Spacer size="lg" />
		<Container size="lg">
		  <Burn />
		</Container>	  
      <Spacer size="lg" />
	  <Container size="lg">
	    <Slide />
	  </Container>
	  <Spacer size="lg" />
      <div
        style={{
          margin: '0 auto'
        }}
      >
        <Button text="Earn KtKt" to="/earn" />
      </div>
    </Page>
  )
}


export default Home

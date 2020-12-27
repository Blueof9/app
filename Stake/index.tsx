import React, { useEffect } from 'react'

import styled from 'styled-components'

import logo from '../../assets/images/logo-icon.png'
import MMS from '../../assets/svg/BFX.svg'

import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'

import Harvest from './components/Harvest'
import Stake from './components/Stake'

import { useActiveWeb3React } from '../../hooks'

const Farm: React.FC = () => {
  const { account } = useActiveWeb3React()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Page>
      {!!account ? (
        <>
          <PageHeader
            icon={logo}
            icon1={MMS}
            isMMS
            subtitle={`Deposit KtKt Tokens to earn more KtKts through MMS`}
            title="MMS (MMS)"
          />
          <StyledFarm>
            <StyledCardsWrapper>
              <StyledCardWrapper>
                <Harvest />
              </StyledCardWrapper>
              <Spacer />
              <StyledCardWrapper>
                <Stake />
              </StyledCardWrapper>
            </StyledCardsWrapper>
            <Spacer size="lg" />
            <StyledInfo>
              ⚡ You will earn a portion of the swaps fees based on the amount of MMS (MMS Token) held relative the
              weight of the staking. MMS can be minted by staking KtKt. To redeem KtKt staked plus swap fees convert
              MMS back to KtKt.
            </StyledInfo>
            <Spacer size="lg" />
          </StyledFarm>
        </>
      ) : (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',

            flex: 1,
            justifyContent: 'center'
          }}
        >
          <Text>Connect to your wallet</Text>
        </div>
      )}
    </Page>
  )
}

/*const NextBlock = styled.strong`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 1rem 0;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary1};
  width: fit-content;
`*/

const Text = styled.p`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.5rem 0 0.25rem;
  font-size: 1.5rem;
  width: fit-content;
`

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

const StyledInfo = styled.h3`
  color: ${props => props.theme.text1};
  font-size: 16px;
  max-width: 50%;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default Farm

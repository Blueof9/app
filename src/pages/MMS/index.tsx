import React, { useEffect, useMemo } from 'react'

import styled from 'styled-components'

import { provider } from 'web3-core'
import PageHeader from '../../components/MMSPageHeader'
import Spacer from '../../components/Spacer'
//import KtKtlogo from '../../assets/images/logo.png'
import Countdown, { CountdownRenderProps } from 'react-countdown'

import { getContract } from '../../utils/erc20'
import Harvest from './components/Harvest'
import Stake from './components/Stake'
import TokenInfo from './components/TokenInfo'
import { getSushiAddress } from '../../sushi/utils'
import useSushi from '../../hooks/useSushi'

import { useActiveWeb3React } from '../../hooks'

const Farm: React.FC = () => {
  const { account } = useActiveWeb3React()
  
  const pid = 0;
  const lpToken = "KtKt";
  const sushi = useSushi()
  const lpTokenAddress = getSushiAddress(sushi);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { library } = useActiveWeb3React()

  const ethereum = library?.provider

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, lpTokenAddress)
  }, [ethereum, lpTokenAddress])
  
  const startTime = 1602939600 //17-10 20.00

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds, days } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <StyledClosedInfo>
        Pool will open in {days} days + {paddedHours}:{paddedMinutes}:{paddedSeconds}
      </StyledClosedInfo>
    )
  }
  const poolActive = startTime * 1000 - Date.now() <= 0


  return (
    <>
      {!!account ? (
        <>
          <PageHeader subtitle="KtKt" icon='https://gateway.pinata.cloud/ipfs/QmeJdurtQS8DvZdbP6G2PDfxjndYNKAy3tHAsDaH9RqozX' title="Stake KtKt to earn MMS" />
		  <TokenInfo />
		  <Spacer size="lg" />
          <StyledFarm>
		    {poolActive ? 
				<StyledCardsWrapper>
				  <StyledCardWrapper>
					<Harvest pid={pid} />
				  </StyledCardWrapper>
				  <Spacer size="lg" />
				  <StyledCardWrapper>
					<Stake lpContract={lpContract} pid={pid} tokenName={lpToken.toUpperCase()} />
				  </StyledCardWrapper>
				</StyledCardsWrapper>
			: <Countdown date={new Date(startTime * 1000)} renderer={renderer} />}
            <Spacer size="lg" />
            <StyledInfo>
              🧊 Every time you stake and unstake KtKt tokens, the contract will automagically claim MMS rewards for you!.
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
    </>
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
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

const StyledClosedInfo = styled.h3`
  color: ${props => props.theme.text1};
  font-size: 40px;
  font-weight: 600;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default Farm

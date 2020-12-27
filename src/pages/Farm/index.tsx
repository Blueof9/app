import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import logo from '../../assets/images/logo-icon.png'

import { provider } from 'web3-core'
import PageHeader from '../../components/FarmStakePageHeader'
import Spacer from '../../components/Spacer'
import useFarm from '../../hooks/useFarm'
import Countdown, { CountdownRenderProps } from 'react-countdown'

import { useActiveWeb3React } from '../../hooks'

import { getContract } from '../../utils/erc20'
import TokenInfo from './components/TokenInfo'
import Harvest from './components/Harvest'
import Stake from './components/Stake'

const Farm: React.FC = () => {
  const { poolId }: { poolId: string } = useParams()
  const { account } = useActiveWeb3React()
  const { pid, lpToken, lpTokenAddress, icon, bonus } = useFarm(poolId) || {
    pid: 0,
    lpToken: '',
    lpTokenAddress: '',
    tokenAddress: '',
    name: '',
    icon: '',
	bonus: 0,
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { library } = useActiveWeb3React()

  const ethereum = library?.provider

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, lpTokenAddress)
  }, [ethereum, lpTokenAddress])

  const lpTokenName = useMemo(() => {
    return lpToken.toUpperCase()
  }, [lpToken])

  let startTime = 1602766800  //15-10 20.00
  if(pid === 14){ //KtKt-MMS
	  startTime = 1603692000 //25-10 12.00
  }
  /*if(pid === 11){ //cake
	  startTime = 1603292400 //21-10 22.00
  }
  if(pid === 12){ //twt
	  startTime = 1603292400 //21-10 22.00
  }
  if(pid === 13){ //twt
	  startTime = 1603292400 //21-10 22.00
  }*/

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
		  <PageHeader
			icon={icon}
			icon1={
			  lpTokenName === 'MMS-KtKt STLP'
				? logo
				: lpTokenName === 'BUSD-USDT LP'
				? 'https://bscscan.com/token/images/busd_32.png'
				: undefined
			}
			subtitle={`${lpTokenName}`}
			title={lpTokenName}
		  />
		  <TokenInfo lpTokenAddress={lpTokenAddress} pid={pid} bonus={bonus} />
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
			  🧊 Every time you stake and unstake LP tokens, the contract will automagically claim KtKt rewards for you!
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

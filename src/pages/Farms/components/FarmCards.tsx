import BigNumber from 'bignumber.js'
import React from 'react'

import Countdown, { CountdownRenderProps } from 'react-countdown'
import styled, { keyframes } from 'styled-components'

import Button from '../../../components/FarmButton'
import Card from './Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Loader from '../../../components/FarmLoader'
import Spacer from '../../../components/Spacer'
import { Farm } from '../../../contexts/Farms'

import useAllStakedValue, { StakedValue } from '../../../hooks/useAllStakedValue'
import useLiquidityCheck from '../../../hooks/useLiquidityCheck'
import useFarms from '../../../hooks/useFarms'
import { currencyFormat } from '../../../utils/formatBalance'
import usePoolApy from '../../../hooks/usePoolApy'

//import useSushi from '../../../hooks/useSushi'
//import { getBNBBUSDPair } from '../../../sushi/utils'

interface FarmWithStakedValue extends Farm, StakedValue {
  apy: BigNumber | null
}

const FarmCards: React.FC = () => {
  const [farms] = useFarms()

  const stakedValue = useAllStakedValue()

  const sushiIndex = farms.findIndex(({ tokenSymbol }) => tokenSymbol === 'KtKt')

  const sushiPrice =
    sushiIndex >= 0 && stakedValue[sushiIndex] ? stakedValue[sushiIndex].tokenPriceInWeth : new BigNumber(0)

  const BLOCKS_PER_YEAR = new BigNumber(10512000)
  const SUSHI_PER_BLOCK = new BigNumber(0.14)

  const rows = farms.reduce<FarmWithStakedValue[][]>(
    (farmRows, farm, i) => {
      const farmWithStakedValue = {
        ...farm,
        ...stakedValue[i],
        apy: stakedValue[i]
          ? sushiPrice
              .times(SUSHI_PER_BLOCK)
              .times(BLOCKS_PER_YEAR)
              .times(stakedValue[i].poolWeight)
              .div(stakedValue[i].totalWethValue)
          : null
      }
      const newFarmRows = [...farmRows]
      if (newFarmRows[newFarmRows.length - 1].length === 3) {
        newFarmRows.push([farmWithStakedValue])
      } else {
        newFarmRows[newFarmRows.length - 1].push(farmWithStakedValue)
      }
      return newFarmRows
    },
    [[]]
  )

  return (
    <StyledCards>
      {!!rows[0].length ? (
        rows.map((farmRow, i) => (
          <StyledRow key={i}>
            {farmRow.map((farm, j) => (
              <React.Fragment key={j}>
                <FarmCard farm={farm} />
                {(j === 0 || j === 1) && <StyledSpacer />}
              </React.Fragment>
            ))}
          </StyledRow>
        ))
      ) : (
        <StyledLoadingWrapper>
          <Loader text="Loading ..." />
        </StyledLoadingWrapper>
      )}
    </StyledCards>
  )
}

interface FarmCardProps {
  farm: FarmWithStakedValue
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }) => {
  
  let startTime = 1602766800 //15-10 20.00
  if(farm.pid === 14){ //KtKt-MMS
	  startTime = 1603692000 //26-10 12.00
  }
  /*if(farm.pid === 11){ //cake
	  startTime = 1603292400 //21-10 22.00
  }
  if(farm.pid === 12){ //twt
	  startTime = 1603292400 //21-10 22.00
  }
  if(farm.pid === 13){ //twt
	  startTime = 1603292400 //21-10 22.00
  }*/

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds, days } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span style={{ width: '100%' }}>
        {days} days + {paddedHours}:{paddedMinutes}:{paddedSeconds}
      </span>
    )
  }

  // useEffect(() => {
  //   async function fetchEarned() {
  //     if (sushi) return
  //     const earned = await getEarned(getMasterChefContract(sushi), lpTokenAddress, account)
  //     setHarvestable(bnToDec(earned))
  //   }
  //   if (sushi && account) {
  //     fetchEarned()
  //   }
  // }, [sushi, lpTokenAddress, account, setHarvestable])

  const poolActive = startTime * 1000 - Date.now() <= 0
  //const sushi = useSushi()
  //const BNBBUSDPair = getBNBBUSDPair(sushi)
  let totalLiquidity = useLiquidityCheck(farm.lpTokenAddress)
  let apy = usePoolApy(farm.lpTokenAddress, farm.pid)
  const buy_uri = '/#/swap?inputCurrency='+farm.base+'&outputCurrency='+farm.tokenAddress;
  const deposit_uri = '/#/add/'+farm.base+'/'+farm.tokenAddress;
  return (
    <StyledCardWrapper>
      {farm.tokenSymbol === 'KtKt' || farm.tokenSymbol === 'MMS' ? <StyledCardAccent /> : null}
      <Card>
        <CardContent>
          <StyledContent>			
            <CardIcon>
				{farm.bonus === 0 ? <StyledInactiveReward><span>Inactive</span></StyledInactiveReward> : <StyledBonusReward><span>{farm.bonus}x</span></StyledBonusReward>}
				<img src={farm.icon} alt="Icon" />
            </CardIcon>
            <StyledTitle>{farm.name}</StyledTitle>
            <StyledDetail><a href={buy_uri}><small>* Click here to buy/exchange</small></a></StyledDetail>
            <StyledDetail><a href={deposit_uri}><small>* Click here to add liquidity</small></a></StyledDetail>
            <StyledDetail>
				<span>Deposit</span>
                <TokenDetail><span><a href={deposit_uri}>{farm.lpToken}</a></span></TokenDetail>
			</StyledDetail>
            <StyledDetail>
				<span>Earn</span>
                <TokenDetail><span>{farm.earnToken}</span></TokenDetail>
			</StyledDetail>
			<StyledDetail>
				<span>Total Liquidity</span>
				<TokenDetail><span>{totalLiquidity ? `$${currencyFormat(totalLiquidity, 0)}` : 'Loading...'}</span></TokenDetail>
			</StyledDetail>
            <Spacer />
            <Button disabled={!poolActive} text={poolActive ? 'Select' : undefined} to={`/earn/${farm.id}`}>
              {!poolActive && <Countdown date={new Date(startTime * 1000)} renderer={renderer} />}
            </Button>
            <StyledInsight>
              <span>APY</span>
			  {farm.bonus === 0 ? 'Inactive' : poolActive ? <span>{apy ? `${currencyFormat(apy, 2)}%` : 'Loading'}</span> : <span>Oct 26, 2020</span>}
              {/*poolActive ? <span>{apy ? `${currencyFormat(apy, 2)}%` : 'Loading'}</span> : <span>Oct 26, 2020</span>*/}
            </StyledInsight>
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  )
}

const RainbowLight = keyframes`
  
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
  background: ${props => props.theme.secondary5};
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 12px;
  filter: blur(6px);
  position: absolute;
  top: -5px;
  right: -5px;
  bottom: -5px;
  left: -5px;
  z-index: -1;
`

const StyledCards = styled.div`
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${props => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${props => props.theme.spacing[4]}px * 2) / 3);
  position: relative;
`

const StyledTitle = styled.h4`
  color: ${props => props.theme.text1};
  font-size: 22px;
  font-weight: 500;
  margin: ${props => props.theme.spacing[2]}px 0 0;
  margin-bottom: 10px;
  padding: 0;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledSpacer = styled.div`
  height: ${props => props.theme.spacing[4]}px;
  width: ${props => props.theme.spacing[4]}px;
`

const StyledDetail = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  color: ${props => props.theme.text1};
  width: 100%;
  margin-top: 12px;
  line-height: 20px;
  font-size: 16px;
  text-align: center;
  padding: 0 5px;
`

const StyledBonusReward = styled.div`
 position: absolute;
 line-height: 30px;
 padding: 0px 15px;
 background: ${({ theme }) => theme.primary1};
 color:  white;
 border-radius: 15px;
 font-size: 17px;
 font-weight: bold; 
 left: 210px;
 top: 15px;
`

const StyledInactiveReward = styled.div`
 position: absolute;
 line-height: 30px;
 padding: 0px 10px;
 background: ${({ theme }) => theme.red1};
 color:  white;
 border-radius: 15px;
 font-size: 16px;
 font-weight: bold; 
 left: 190px;
 top: 15px;
`

const TokenDetail  = styled.div`
 font-size: 16px;
 font-weight: 600;
 color: ${props => props.theme.text1};
`

const StyledInsight = styled.div`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 8px;
  background: ${({ theme }) => theme.bg2};
  color: ${({ theme }) => theme.primary1};
  font-weight: bold;
  width: 100%;
  margin-top: 12px;
  line-height: 32px;
  font-size: 15px;
  text-align: center;
  padding: 0 10px;
`

export default FarmCards

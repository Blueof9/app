//import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import Container from '../../../components/Container'

//import Spacer from '../../../components/Spacer'
/*import useSushi from '../../../hooks/useSushi'
import { getSushiSupply } from '../../../sushi/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import useAllStakedValue from '../../../hooks/useAllStakedValue'
import useFarms from '../../../hooks/useFarms'*/
import useLiquidityCheck from '../../../hooks/useLiquidityCheck'
import useRewardPerDay from '../../../hooks/useRewardPerDay'
import usePoolApy from '../../../hooks/usePoolApy'
import { currencyFormat } from '../../../utils/formatBalance'

interface StakeProps {
  lpTokenAddress: string
  pid: number
  bonus: number
}

const Balances: React.FC<StakeProps> = ({ lpTokenAddress, pid, bonus }) => {
	
	let totalLiquidity = useLiquidityCheck(lpTokenAddress)
	let rewardPerDay = useRewardPerDay(pid)
	let apy = usePoolApy(lpTokenAddress, pid)
	
	/*const [farms] = useFarms()
	const stakedValue = useAllStakedValue()

	const sushiIndex = farms.findIndex(({ tokenSymbol }) => tokenSymbol === 'KtKt')
	const poolToken = farms.findIndex(({ pid }) => pid === pid)
	
	const sushiPrice =
		sushiIndex >= 0 && stakedValue[sushiIndex] ? stakedValue[sushiIndex].tokenPriceInWeth : new BigNumber(0)

	const BLOCKS_PER_YEAR = new BigNumber(10368000)
	const SUSHI_PER_BLOCK = new BigNumber(0.14)
  
	const apy = stakedValue[poolToken]
          ? sushiPrice
              .times(SUSHI_PER_BLOCK)
              .times(BLOCKS_PER_YEAR)
              .times(stakedValue[poolToken].poolWeight)
              .div(stakedValue[poolToken].totalWethValue)
          : new BigNumber(0)
  
	const [totalSupply, setTotalSupply] = useState<BigNumber>()
	const sushi = useSushi()

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getSushiSupply(sushi)
      setTotalSupply(supply)
    }
    if (sushi) {
      fetchTotalSupply()
    }
  }, [sushi, setTotalSupply])*/

  return (
	<Container size="md">
		<StyledWrapper>
			<StyledInfo>
				<BoxInfo>
					<StyledSubtitle>Est. APY</StyledSubtitle>
					<TitleString>
						{bonus === 0 ? 'Inactive' : apy ? `${currencyFormat(apy, 2)}%` : 'Loading' }
						{/*apy ? `${currencyFormat(apy, 2)}%` : 'Loading'*/}
					</TitleString>
				</BoxInfo>
				<BoxInfo>
					<StyledSubtitle>Total Liquidity</StyledSubtitle>
					<TitleString>{totalLiquidity ? `$${currencyFormat(totalLiquidity, 0)}` : 'Loading'}</TitleString>
				</BoxInfo>
				<BoxInfo>
					<StyledSubtitle>Daily KtKt Pool Rewards</StyledSubtitle>
					<TitleString>
						{bonus === 0 ? 'Inactive' : rewardPerDay ? `${currencyFormat(rewardPerDay, 2)} KtKt` : 'Loading'}
					</TitleString>
				</BoxInfo>
			</StyledInfo>
		</StyledWrapper>
	</Container>
  )
}

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledInfo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const StyledSubtitle = styled.h3`
  color: ${({ theme }) => theme.text1};
  font-size: 15px;
  font-weight: 500;
  margin: 0;
  padding: 0;
  text-align: center;
  margin-bottom: 10px;
`

const TitleString = styled.strong`
  color: ${({ theme }) => theme.text1};
  text-align: center;
  font-size: 25px; 
`

const BoxInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 33.333%;
  @media (max-width: 768px) {
	  width: 100%;
	  margin-bottom: 20px;
  }
`

export default Balances

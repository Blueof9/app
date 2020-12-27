//import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'

import logoKtKt from '../../../assets/images/logoKtKtSmallBg.png'
import logoMMS from '../../../assets/images/logoMMSSmallBg.png'
import usePoolApy from '../../../hooks/usePoolApy'
import { currencyFormat } from '../../../utils/formatBalance'
import useSushi from '../../../hooks/useSushi'
import { getKtKtBNBPair, getMMSBNBPair, getBNBBUSDPair, getBUSDUSDTPair } from '../../../sushi/utils'
import useTVLCheck from '../../../hooks/useTVLCheck'

const Balances: React.FC = () => {
	
	const sushi = useSushi()
	const KtKtBNBPair = getKtKtBNBPair(sushi)
	const MMSBNBPair = getMMSBNBPair(sushi)
	const BNBBUSDPair = getBNBBUSDPair(sushi)
	const BUSDUSDTPair = getBUSDUSDTPair(sushi)
	
	let apy1 = usePoolApy(KtKtBNBPair, 8)
	let apy2 = usePoolApy(MMSBNBPair, 9)
	let apy3 = usePoolApy(BNBBUSDPair, 0)
	let apy4 = usePoolApy(BUSDUSDTPair, 5)
	
	const AllValue = useTVLCheck()

  return (
		<StyledWrapper>
			<StyledUpper>
				<StyledHeaderInfo>
					<HeaderFont>Pools</HeaderFont>
				</StyledHeaderInfo>
			</StyledUpper>			
			<StyledUnder>
				<StyledCard>
					<StyledCardContent>
						<StyledFlex>
							<StyledImg>
								<img src={logoKtKt} alt="coin logo1" />
								<img src="https://bscscan.com/token/images/binance_32.png" alt="coin logo2" />
							</StyledImg>
							<StyledPiarName>
								KtKt-BNB
							</StyledPiarName>
						</StyledFlex>
						<StyledApy>
							{apy1 ? `${currencyFormat(apy1, 2)}%` : 'Loading'}
						</StyledApy>
						<StyledApyLabel>Est. APY</StyledApyLabel>
					</StyledCardContent>
				</StyledCard>
				<StyledCard>
					<StyledCardContent>
						<StyledFlex>
							<StyledImg>
								<img src={logoMMS} alt="coin logo1" />
								<img src="https://bscscan.com/token/images/binance_32.png" alt="coin logo2" />
							</StyledImg>
							<StyledPiarName>
								MMS-BNB
							</StyledPiarName>
						</StyledFlex>
						<StyledApy>
							{apy2 ? `${currencyFormat(apy2, 2)}%` : 'Loading'}
						</StyledApy>
						<StyledApyLabel>Est. APY</StyledApyLabel>
					</StyledCardContent>
				</StyledCard>
				<StyledCard>
					<StyledCardContent>
						<StyledFlex>
							<StyledImg>
								<img src="https://bscscan.com/token/images/busd_32.png" alt="coin logo1" />
								<img src="https://bscscan.com/token/images/binance_32.png" alt="coin logo2" />
							</StyledImg>
							<StyledPiarName>
								BUSD-BNB
							</StyledPiarName>
						</StyledFlex>
						<StyledApy>
							{apy3 ? `${currencyFormat(apy3, 2)}%` : 'Loading'}
						</StyledApy>
						<StyledApyLabel>Est. APY</StyledApyLabel>
					</StyledCardContent>
				</StyledCard>
				<StyledCard>
					<StyledCardContent>
						<StyledFlex>
							<StyledImg>
								<img src="https://bscscan.com/token/images/busd_32.png" alt="coin logo1" />
								<img src="https://bscscan.com/token/images/tether_32.png" alt="coin logo2" />
							</StyledImg>
							<StyledPiarName>
								BUSD-USDT
							</StyledPiarName>
						</StyledFlex>
						<StyledApy>
							{apy4 ? `${currencyFormat(apy4, 2)}%` : 'Loading'}
						</StyledApy>
						<StyledApyLabel>Est. APY</StyledApyLabel>
					</StyledCardContent>
				</StyledCard>				
			</StyledUnder>	
			<StyledTVLInfo>
				<TVLFont>Total Value Locked: {AllValue ? `$${currencyFormat(AllValue, 0)}` : 'Loading'}</TVLFont>
			</StyledTVLInfo>
		</StyledWrapper>
  )
}

const StyledUpper = styled.div`
  align-items: center;
  text-align: center;
`

const StyledFlex = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
  justify-content: center;
  @media (max-width: 1277px) {
	  justify-content: flex-start;
	  padding-left: 15px;
  }
`

const StyledUnder = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-wrap: wrap;  
  @media (max-width: 821px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledCardContent = styled.div`
  text-align: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-top: 30px;
  padding-bottom: 30px;
  @media (max-width: 1277px) {
	  width: 100%;
	  display: flex;
	  flex-direction: row;
	  padding-top: 15px;
      padding-bottom: 15px;
  }
`

const StyledCard = styled.div`  
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  box-shadow: rgba(0, 0, 1, 0.10) 0px 1px 5px;
  border-radius: 5px;
  background: ${props => props.theme.bg1};
  margin-top: 12px;
  margin-right: 15px;
  @media (max-width: 821px) {
	  margin-right: 0px;
  }
  @media (max-width: 1277px) {
	  width: 100%;
	  margin-top: 0px;
	  margin-right: 0px;
	  border-radius: 0px;
	  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px;
  }
`

const StyledHeaderInfo = styled.div`
  text-align: center;
  margin-bottom: 20px;
  @media (max-width: 768px) {
	  padding-top: 20px;
  }
`

const StyledWrapper = styled.div`
  background: ${props => props.theme.bg3};
  padding: 20px 30px;
  align-items: center;
  display: column;
  width: 100%;
  @media (max-width: 768px) {
	padding: 0px;
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
  @media (max-width: 1170px) {
    flex-flow: column nowrap;
  }
`

const HeaderFont = styled.div`
  font-size: 35px;
  font-weight: 500;  
`

const StyledTVLInfo = styled.div`  
  text-align: center;
  margin-top: 20px;
  @media (max-width: 768px) {
	  padding-bottom: 20px;	  
  }
`

const TVLFont = styled.div`
  font-size: 25px;
  font-weight: 500;  
`

const StyledPiarName = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-left: 8px;
  align-items: center;
  @media (max-width: 1277px) {
	  font-size: 16px;
	  width: 70%
	  text-align: left;
  }
  
`

const StyledImg = styled.div`
  img {
    width: 20px;
    height: 20px;
  }
`

const StyledApy = styled.div`
  font-size: 33px;
  font-weight: 500;
  margin-top: 15px;
  color: ${props => props.theme.primary1};
  @media (min-width: 821px) {
    min-width: 16.1rem;
  }
  @media (max-width: 1277px) {
	  margin-top: 0px;
	  font-size: 18px;
	  text-align: right;
	  width: 70%
	  margin-right: 20px;
  }
`

const StyledApyLabel = styled.div`
  font-size: 15px;
  margin-top: 7px;
  opacity: .85;
  @media (max-width: 1277px) {
	  display: none;
  }
`

/*const line = styled.line`
    background-color: #E2D6C9;
    opacity: .3;
    height: 1px;
    margin-left: 24px;
    margin-right: 24px;
	align-self: stretch;
    margin-top: 19px;
    margin-bottom: 19px;
`*/

/*const StyledSubtitle = styled.h3`
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
`*/

export default Balances

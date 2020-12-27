import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useSushi from '../../../hooks/useSushi'
import { getKtKtBurn, getMMSBurn, getKtKtPrice, getMMSPrice} from '../../../sushi/utils'
import { getBalanceNumber, currencyFormat } from '../../../utils/formatBalance'

const Balances: React.FC = () => {	

  const [totalKtKtBurn, setTotalKtKtBurn] = useState<BigNumber>()
  const [totalMMSBurn, setTotalMMSBurn] = useState<BigNumber>()
  const [KtKtBurnInUSD, setKtKtBurnInUSD] = useState<number>()
  const [MMSBurnInUSD, setMMSBurnInUSD] = useState<number>()
  const sushi = useSushi()

  useEffect(() => {
    async function fetchTotalSupply() {
		//return;//DBG
      const KtKtBurn = await getKtKtBurn(sushi)
	  const MMSBurn = await getMMSBurn(sushi)
	  
	  const KtKtPrice = await getKtKtPrice(sushi)
	  const MMSPrice = await getMMSPrice(sushi)
	  
	  const KtKtBurnInUSD = await getBalanceNumber(KtKtBurn)*KtKtPrice
	  const MMSBurnInUSD = await getBalanceNumber(MMSBurn)*MMSPrice
	  
      setTotalKtKtBurn(KtKtBurn)
	  setTotalMMSBurn(MMSBurn);
	  setKtKtBurnInUSD(KtKtBurnInUSD)
	  setMMSBurnInUSD(MMSBurnInUSD)
    }
    if (sushi) {
      fetchTotalSupply()
    }
  }, [sushi, setTotalKtKtBurn, setTotalMMSBurn, KtKtBurnInUSD, setMMSBurnInUSD])

  return (
		<StyledWrapper>
			<StyledCard>
				<StyledName>
					🔥 Total KtKt burned since launch
				</StyledName>
				<StyledTotalBurn>
					<BurnAmount>{totalKtKtBurn ? currencyFormat(getBalanceNumber(totalKtKtBurn), 3) : 'Locked'}</BurnAmount>
					{KtKtBurnInUSD ? `$${currencyFormat(KtKtBurnInUSD, 0)}` : ''}
				</StyledTotalBurn>
			</StyledCard>
			<StyledCard>
				<StyledName>
					🔥 Total MMS burned since launch
				</StyledName>
				<StyledTotalBurn>
					<BurnAmount>{totalMMSBurn ? currencyFormat(getBalanceNumber(totalMMSBurn), 3) : 'Locked'}</BurnAmount>
					{MMSBurnInUSD ? `$${currencyFormat(MMSBurnInUSD, 0)}` : ''}
				</StyledTotalBurn>
			</StyledCard>
		</StyledWrapper>
  )
}

const StyledCard = styled.div`
  background: ${props => props.theme.bg2};
  padding: 10px 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  @media (max-width: 768px) {
	  background: ${props => props.theme.bg1};
  }
  @media (max-width: 821px) {
	  flex-direction: column;
  }
`

const StyledName = styled.div`
  font-size: 19px;
  font-weight: 500;
  margin-left: 8px;
  align-items: center;
  text-align: left;
  width: 50%;
  margin: auto;
  @media (max-width: 821px) {
	  width: 100%;
	  text-align: center;
  }
`

const StyledTotalBurn = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.red1};
  text-align: right;
  width: 50%;
  @media (max-width: 821px) {
	  width: 100%;
	  text-align: center;
	  padding-top: 15px;
  }
`

const BurnAmount = styled.div`
  color: ${props => props.theme.text1};
  font-size: 25px;
  font-weight: 600;
`

const StyledWrapper = styled.div`
  background: ${props => props.theme.bg1};
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

export default Balances

import React from 'react'
import styled from 'styled-components'

import wordmark from '../../assets/images/wordmarkbigBlack.png'

import { useActiveWeb3React } from '../../hooks'
import useKtKtPrice from '../../hooks/useKtKtPrice'
import useMMSPrice from '../../hooks/useMMSPrice'
import { currencyFormat } from '../../utils/formatBalance' 

import Page from '../../components/Page'
import PageHeader from '../../components/OtherPageHeader'

import FarmCards from './components/FarmCards'

const Farms: React.FC = () => {
  const { account } = useActiveWeb3React()
  const startTime = 1602939600 //17-10 20.00
  const MMSOpen = startTime * 1000 - Date.now() <= 0
  const KtKtPrice = useKtKtPrice()
  const MMSPrice = useMMSPrice()
  
  return (
    <Page>
      {!!account ? (
        <>
          <PageHeader wordmark={wordmark} title="Stake LP tokens to earn KtKt" />
		  <TokenPrice>
			<PriceFont>KtKt Price: {KtKtPrice ? `$${currencyFormat(KtKtPrice, 3)}` : 'Loading'}</PriceFont>
			{MMSOpen ? <PriceFont>MMS Price: {MMSPrice ? `$${currencyFormat(MMSPrice, 3)}` : 'Loading'}</PriceFont> : ''}
		  </TokenPrice>
          <FarmCards />
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

const PriceFont = styled.div`
  font-size: 20px;
  font-weight: 500;
  padding-bottom: 10px;
`

const TokenPrice = styled.div`
  padding-bottom: ${props => props.theme.spacing[5]}px;
`

const Text = styled.p`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.5rem 0 0.25rem;
  font-size: 1.5rem;
  width: fit-content;
`

export default Farms

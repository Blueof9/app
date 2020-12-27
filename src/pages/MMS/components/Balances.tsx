import React from 'react'
import styled from 'styled-components'

import logo from '../../../assets/images/logo.png'

import { useActiveWeb3React } from '../../../hooks'
import Card from '../../../components/BalanceCard'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useSushi from '../../../hooks/useSushi'
import { getMMSAddress } from '../../../sushi/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import useMMSSupply from '../../../hooks/useMMSTotalSupply'

const Balances: React.FC = () => {
  const totalSupply = useMMSSupply()
  const sushi = useSushi()
  const sushiBalance = useTokenBalance(getMMSAddress(sushi))
  const { account } = useActiveWeb3React()

  return (
    <StyledWrapper>
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              <img src={logo} alt="MMS" />
              <Spacer />
              <div style={{ flex: 1 }}>
                <Label text="Your MMS Balance" />
                <Value value={!!account ? getBalanceNumber(sushiBalance) : 'Locked'} />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
        <Footnote>
          .
        </Footnote>
      </Card>
      <Spacer />

      <Card>
        <CardContent>
          <Label text="Total MMS Supply" />
          <Value value={totalSupply ? getBalanceNumber(totalSupply) : 'Locked'} />
        </CardContent>
        <Footnote>
          Rewards per block:
          <FootnoteValue>0.026 MMS</FootnoteValue>
        </Footnote>
      </Card>
    </StyledWrapper>
  )
}

const Footnote = styled.div`
  font-size: 14px;
  padding: 8px 20px;
  color: ${props => props.theme.text1};
  border-top: solid 1px ${props => props.theme.primary4};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;

  @media (min-width: 800px) {
    min-width: 20rem;
  }
`
const FootnoteValue = styled.div``

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledBalances = styled.div`
  display: flex;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex: 1;

  img {
    width: 3rem;
    height: 4rem;
  }
`

export default Balances

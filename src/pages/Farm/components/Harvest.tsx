import React, { useState } from 'react'
import styled from 'styled-components'

import logo from '../../../assets/images/logo.png'

import Button from '../../../components/FarmButton'
import Card from './Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useEarnings from '../../../hooks/useEarnings'
import useReward from '../../../hooks/useReward'
import useEarningsToUSD from '../../../hooks/useEarningsToUSD'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { currencyFormat } from '../../../utils/formatBalance'

interface HarvestProps {
  pid: number
}

const Harvest: React.FC<HarvestProps> = ({ pid }) => {
  const earnings = useEarnings(pid)
  const [pendingTx, setPendingTx] = useState(false)  
  const { onReward } = useReward(pid)
  const pendingInUSD = useEarningsToUSD(pid)

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <StyledLogo src={logo} alt="ChocoSwap" />
            </CardIcon>
			<Label text="Unclaimed KtKt" />
            <Value value={getBalanceNumber(earnings)} />
			<StyledPendingUSD>{pendingInUSD ? `($${currencyFormat(pendingInUSD, 2)})` : '($0)'}</StyledPendingUSD>
          </StyledCardHeader>
          <StyledCardActions>
            <Button
              disabled={!earnings.toNumber() || pendingTx}
              text={pendingTx ? 'Collecting KtKt' : 'Claim KtKt'}
              onClick={async () => {
                setPendingTx(true)
                await onReward()
                setPendingTx(false)
              }}
            />
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

const StyledPendingUSD = styled.div`  
  font-size: 16px;
`

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.theme.spacing[6]}px;
  width: 100%;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

const StyledLogo = styled.img`
  height: 3.7rem;
  width: 3.7rem;
`

export default Harvest

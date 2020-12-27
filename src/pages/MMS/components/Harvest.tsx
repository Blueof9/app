import React, { useState } from 'react'
import styled from 'styled-components'

import logo from '../../../assets/images/MMSlogo.png'

import Button from '../../../components/FarmButton'
import Card from './Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useEarnings from '../../../hooks/useMMSEarnings'
import useReward from '../../../hooks/useMMSReward'
import { getBalanceNumber } from '../../../utils/formatBalance'
import useMMSEarningsToUSD from '../../../hooks/useMMSEarningsToUSD'
import { currencyFormat } from '../../../utils/formatBalance'

interface HarvestProps {
  pid: number
}

const Harvest: React.FC<HarvestProps> = ({ pid }) => {
  const earnings = useEarnings(pid)
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useReward(pid)
  const pendingInUSD = useMMSEarningsToUSD(pid)
  
  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <StyledLogo src={logo} alt="ChocoSwap" />
            </CardIcon>
			<Label text="Unclaimed MMS" />
            <Value value={getBalanceNumber(earnings)} />
			<StyledPendingUSD>{pendingInUSD ? `($${currencyFormat(pendingInUSD, 2)})` : '($0)'}</StyledPendingUSD>
          </StyledCardHeader>
          <StyledCardActions>
            <Button
              disabled={!earnings.toNumber() || pendingTx}
              text={pendingTx ? 'Collecting MMS' : 'Claim MMS'}
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

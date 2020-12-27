import React from 'react'
import styled from 'styled-components'

import logo from '../../../assets/images/logo.png'

import Button from '../../../components/FarmButton'
import Card from './Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import { getBalanceNumber } from '../../../utils/formatBalance'
import DepositModal from './DepositModal'

import useModal from '../../../hooks/useModal'
import useMMS from '../../../hooks/useMMS'

const Harvest: React.FC = () => {
  const { earnings, handleLeaveMMS } = useMMS()

  const [onPresentDeposit] = useModal(<DepositModal max={earnings} onConfirm={handleLeaveMMS} tokenName="MMS" />)

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <StyledLogo src={logo} alt="KtKt" />
            </CardIcon>
            <Value value={getBalanceNumber(earnings)} />
            <Label text="Estimated KtKts" />
          </StyledCardHeader>
          <StyledCardActions>
            <Button
              disabled={!earnings.toNumber()}
              text={'Convert to KtKt'}
              onClick={onPresentDeposit}
            />
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

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
  height: 3rem;
  width: 2rem;
`

export default Harvest

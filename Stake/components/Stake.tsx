import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import MMS from '../../../assets/svg/BFX.svg'

import Button from '../../../components/FarmButton'
import Card from './Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useModal from '../../../hooks/useModal'
import useMMS from '../../../hooks/useMMS'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useSushi from '../../../hooks/useSushi'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { getSushiAddress } from '../../../sushi/utils'
import DepositModal from './DepositModal'

const Stake: React.FC = () => {
  const [requestedApproval, setRequestedApproval] = useState(false)

  const KtKt = useSushi()
  const KtKtAddress = getSushiAddress(KtKt)

  const { MMSBalance, handleEnterMMS, handleApproveMMS, allowance } = useMMS()
  const KtKtBalance = useTokenBalance(KtKtAddress)

  const [onPresentDeposit] = useModal(
    <DepositModal max={KtKtBalance} onConfirm={handleEnterMMS} tokenName="KtKt" />
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await handleApproveMMS()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {}
  }, [handleApproveMMS, setRequestedApproval])

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <StyledIcon src={MMS} alt="farm icon" />
            </CardIcon>
            <Value value={getBalanceNumber(MMSBalance)} />
            <Label text="MMS Balance" />
          </StyledCardHeader>
          <StyledCardActions>
            {!allowance.toNumber() ? (
              <Button
                disabled={requestedApproval}
                onClick={handleApprove}
                text={'Approve KtKt'}
              />
            ) : (
              <>
                <Button
                  disabled={KtKtBalance.eq(new BigNumber(0))}
                  text={'Convert to MMS'}
                  onClick={onPresentDeposit}
                />
              </>
            )}
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

const StyledIcon = styled.img`
  height: 3rem;
  width: 2rem;
`

export default Stake

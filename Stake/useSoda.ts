import { useCallback, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'

import {
  getMMS,
  getPendingMMS,
  getMMSContract,
  getSushiContract,
  getMMSAddress
} from '../sushi/utils'

// hooks
import useSushi from './useSushi'
import useBlock from './useBlock'
import { useActiveWeb3React } from '.'

const useMMS = () => {
  const [earnings, setEarnings] = useState(new BigNumber(0))
  const [MMSBalance, setMMSBalance] = useState(new BigNumber(0))
  const [allowance, setAllowance] = useState(new BigNumber(0))

  const { account } = useActiveWeb3React()
  const KtKt = useSushi()
  const MMSContract = getMMSContract(KtKt)
  const MMSAddress = getMMSAddress(KtKt)
  const block = useBlock()

  const fetchKtKtBalance = useCallback(async () => {
    const earnings = await getPendingMMS(MMSContract, account)
    setEarnings(new BigNumber(earnings))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, MMSContract, KtKt])

  const fetchMMSBalance = useCallback(async () => {
    const MMSBalance = await getMMS(MMSContract, account)
    setMMSBalance(new BigNumber(MMSBalance))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, MMSContract, KtKt])

  const handleApproveMMS = useCallback(async () => {
    const KtKtContract = getSushiContract(KtKt)
    const tx = await KtKtContract.methods
      .approve(MMSAddress, ethers.constants.MaxUint256.toString())
      .send({ from: account })

    return tx
  }, [account, KtKt, MMSAddress])

  const getMMSAllowance = useCallback(async () => {
    const KtKtContract = getSushiContract(KtKt)

    const allowance = await KtKtContract.methods.allowance(account, MMSAddress).call()

    setAllowance(new BigNumber(allowance))
  }, [account, MMSAddress, KtKt])
  
  useEffect(() => {
    if (account && MMSContract && KtKt) {
      fetchKtKtBalance()
      fetchMMSBalance()
      getMMSAllowance()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, block, KtKt])

  return {
    earnings,
    MMSBalance,
    handleApproveMMS,
    allowance,
  }
}

export default useMMS

import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'

import { getMMSEarned, getMMSMasterContract } from '../sushi/utils'

// hooks
import useSushi from './useSushi'
import useBlock from './useBlock'
import { useActiveWeb3React } from '.'

const useEarnings = (lpTokenAddress: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account } = useActiveWeb3React()
  const sushi = useSushi()
  const masterChefContract = getMMSMasterContract(sushi)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getMMSEarned(masterChefContract, lpTokenAddress, account)
    setBalance(new BigNumber(balance))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, masterChefContract, sushi])

  useEffect(() => {
    if (account && masterChefContract && sushi) {
      //return ;//DBG
      fetchBalance()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, block, masterChefContract, setBalance, sushi])

  return balance
}

export default useEarnings

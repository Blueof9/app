import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'

import { getMMSEarned, getMMSMasterContract, getMMSPrice, getBalanceNumber } from '../sushi/utils'

// hooks
import useSushi from './useSushi'
import useBlock from './useBlock'
import { useActiveWeb3React } from '.'

const useEarnings = (lpTokenAddress: number) => {
  const [balance, setBalance] = useState(0)
  const { account } = useActiveWeb3React()
  const sushi = useSushi()
  const masterChefContract = getMMSMasterContract(sushi)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
	  
	const MMSPrice = await getMMSPrice(sushi)
    const earn = await getMMSEarned(masterChefContract, lpTokenAddress, account)
	const balance = MMSPrice*getBalanceNumber(new BigNumber(earn))
	
    setBalance(balance)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, masterChefContract, sushi])

  useEffect(() => {
    if (account && masterChefContract && sushi) {
      fetchBalance()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, block, masterChefContract, setBalance, sushi])

  return balance
}

export default useEarnings

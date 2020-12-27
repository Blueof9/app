import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'

import { getEarned, getMasterChefContract, getKtKtPrice, getBalanceNumber } from '../sushi/utils'

// hooks
import useSushi from './useSushi'
import useBlock from './useBlock'
import { useActiveWeb3React } from '.'

const useEarnings = (lpTokenAddress: number) => {
  const [totalBlance, setTotalBlance] = useState(0)
  const { account } = useActiveWeb3React()
  const sushi = useSushi()
  const masterChefContract = getMasterChefContract(sushi)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
	  
	const KtKtPrice = await getKtKtPrice(sushi)
    const balance = await getEarned(masterChefContract, lpTokenAddress, account)
	const totalBlance = KtKtPrice*getBalanceNumber(new BigNumber(balance))
	
    setTotalBlance(totalBlance)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, masterChefContract, sushi])

  useEffect(() => {
    if (account && masterChefContract && sushi) {
      fetchBalance()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, block, masterChefContract, setTotalBlance, sushi])

  return totalBlance
}

export default useEarnings

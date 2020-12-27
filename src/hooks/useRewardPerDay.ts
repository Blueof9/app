import { useCallback, useEffect, useState } from 'react'
//import BigNumber from 'bignumber.js'

import { getPoolTotalAllocPoint, getPoolAllocPoint, getMasterChefContract } from '../sushi/utils' //getBalanceNumber

// hooks
import useSushi from './useSushi'
import useBlock from './useBlock'
import { useActiveWeb3React } from '.'

const useChecking = (pid: number) => {
  const [total, setTotal] = useState(0)
  const { account } = useActiveWeb3React()
  const sushi = useSushi()  
  const block = useBlock()
  const MasterChefContract = getMasterChefContract(sushi)  

  const fetchBalance = useCallback(async () => {
	
	const allowPoint = await getPoolAllocPoint(MasterChefContract, pid)
	const totalPoint = await getPoolTotalAllocPoint(MasterChefContract)
	const NumberPoolWeight = allowPoint / totalPoint
	
	const KtKt_PER_BLOCK = 0.14
	const BLOCK_PER_DAY = 28800	
	
	const PoolReward = KtKt_PER_BLOCK * BLOCK_PER_DAY * NumberPoolWeight
	
    setTotal(PoolReward)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, sushi])

  useEffect(() => {
    if (account && sushi) {
      fetchBalance()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, setTotal, block, sushi])

  return total
}

export default useChecking

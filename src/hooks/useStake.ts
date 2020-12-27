import { useCallback } from 'react'
import { useLocation } from 'react-router-dom'

import { stake, getMasterChefContract } from '../sushi/utils'

// hooks
import useStorm from './useSushi'
import { useActiveWeb3React } from '.'

const useStake = (lpTokenAddress: number) => {
  const { account } = useActiveWeb3React()
  const sushi = useStorm()
  const location = useLocation()

  const query = new URLSearchParams(location.search)
  const ref = query.get('ref') || '0x0000000000000000000000000000000000000000'

  const handleStake = useCallback(
    async (amount: string) => {
      await stake(getMasterChefContract(sushi), lpTokenAddress, amount, account, ref)
    },
    [account, lpTokenAddress, sushi, ref]
  )

  return { onStake: handleStake }
}

export default useStake

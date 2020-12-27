import { useCallback } from 'react'

import { unstake, getMMSMasterContract } from '../sushi/utils'

// hooks
import useSushi from './useSushi'
import { useActiveWeb3React } from '.'

const useUnstake = (lpTokenAddress: number) => {
  const { account } = useActiveWeb3React()
  const sushi = useSushi()
  const masterChefContract = getMMSMasterContract(sushi)

  const handleUnstake = useCallback(
    async (amount: string) => {
      await unstake(masterChefContract, lpTokenAddress, amount, account)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account, lpTokenAddress, sushi]
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake

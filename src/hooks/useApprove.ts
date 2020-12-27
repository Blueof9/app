import { useCallback } from 'react'
import { Contract } from 'web3-eth-contract'

import { approve, getMasterChefContract } from '../sushi/utils'

// hooks
import useSushi from './useSushi'
import { useActiveWeb3React } from '.'

const useApprove = (lpContract: Contract) => {
  const { account } = useActiveWeb3React()
  const sushi = useSushi()
  const masterChefContract = getMasterChefContract(sushi)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account)

      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, masterChefContract])

  return { onApprove: handleApprove }
}

export default useApprove

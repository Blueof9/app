import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'
import { getMMSMasterContract } from '../sushi/utils'

// hooks
import useSushi from './useSushi'
import { useActiveWeb3React } from '.'

const useAllowance = (lpContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account } = useActiveWeb3React()
  const sushi = useSushi()
  const masterChefContract = getMMSMasterContract(sushi)

  const fetchAllowance = useCallback(async () => {
    if (account) {
      const allowance = await getAllowance(lpContract, masterChefContract, account)
      setAllowance(new BigNumber(allowance))
    }
  }, [account, masterChefContract, lpContract])

  useEffect(() => {
    if (account && masterChefContract && lpContract) {
      fetchAllowance()
    }
    const refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, masterChefContract, lpContract])

  return allowance
}

export default useAllowance

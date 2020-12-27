import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'

import { getContractBalance, getSushiContract, getMMSMasterAddress, getBalanceNumber } from '../sushi/utils' //
//import { getMMSSupply, getMMSContract } from '../sushi/utils'

// hooks
import useSushi from './useSushi'
import useBlock from './useBlock'
import { useActiveWeb3React } from '.'

const useChecking = () => {
  const [totalStaked, setTotalStaked] = useState(0)
  const { account } = useActiveWeb3React()
  const sushi = useSushi()  
  const block = useBlock()
  const KtKtContract = getSushiContract(sushi)
  const MMSMasterAddress = getMMSMasterAddress(sushi)

  const fetchBalance = useCallback(async () => {
	
    const lpamout = await getContractBalance(KtKtContract, MMSMasterAddress)
	const totalStaked = getBalanceNumber(new BigNumber(lpamout))
	
    setTotalStaked(totalStaked)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, sushi])

  useEffect(() => {
    if (account && sushi) {
      fetchBalance()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, setTotalStaked, block, sushi])

  return totalStaked
}

export default useChecking

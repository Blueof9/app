import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'

import { getContractBalance, getBalanceNumber, getSushiContract, getKtKtPrice, getMMSMasterAddress, getMMSPrice } from '../sushi/utils' //
//import { getMMSSupply, getMMSContract } from '../sushi/utils'

// hooks
import useSushi from './useSushi'
import useBlock from './useBlock'
import { useActiveWeb3React } from '.'

const useChecking = () => {
  const [totalApy, setApy] = useState(0)
  const { account } = useActiveWeb3React()
  const sushi = useSushi()  
  const block = useBlock()
  const KtKtContract = getSushiContract(sushi)
  const MMSMasterAddress = getMMSMasterAddress(sushi)

  const fetchBalance = useCallback(async () => {
	
    const lpamout = await getContractBalance(KtKtContract, MMSMasterAddress)
	const KtKtPrice = await getKtKtPrice(sushi)
	const MMSPrice = await getMMSPrice(sushi)
	const totalStaked = getBalanceNumber(new BigNumber(lpamout)) * KtKtPrice //All KtKt in MMSMaSter to usd
	const blockPerYear = 10512000
	const MMSPerBlock = 0.0026 //0.0026
	
	const totalApy = ((MMSPrice * blockPerYear * MMSPerBlock) / totalStaked)*100
	
    setApy(totalApy)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, sushi])

  useEffect(() => {
    if (account && sushi) {
      fetchBalance()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, setApy, block, sushi])

  return totalApy
}

export default useChecking

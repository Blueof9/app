import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'

import { getWethContract, getContractBalance, getBalanceNumber, getBNBPrice, getBUSDUSDTPair, getWbusdContract, getMMSAddress, getMMSPrice, getMMSContract, getMasterChefAddress, getKtKtMMSPair, getKtKtPrice, getSushiContract} from '../sushi/utils' //getBNBBUSDPair
//import { getMMSSupply, getMMSContract } from '../sushi/utils'

// hooks
import useSushi from './useSushi'
import useBlock from './useBlock'
import { useActiveWeb3React } from '.'

const useChecking = (lpPool: string) => {
  const [totalStaked, setTotalStaked] = useState(0)
  const { account } = useActiveWeb3React()
  const sushi = useSushi()  
  const block = useBlock()
  const Contract = getWethContract(sushi)
  const wbusdContract = getWbusdContract(sushi)
  const BUSDUSDTPair = getBUSDUSDTPair(sushi)
  const MMSAddress = getMMSAddress(sushi)
  const MMSContract = getMMSContract(sushi)
  const KtKtMasterAddress = getMasterChefAddress(sushi)
  const KtKtMMSPair = getKtKtMMSPair(sushi)
  const KtKtContract = getSushiContract(sushi)
  //const BNBBUSDpool = getBNBBUSDPair(sushi)

  const fetchBalance = useCallback(async () => {
	
	/*const bnbAmount = await getContractBalance(Contract, BNBBUSDpool)
	const busdAmount = await getContractBalance(wbusdContract, BNBBUSDpool)
	const bnbprice = getBalanceNumber(new BigNumber(busdAmount))/getBalanceNumber(new BigNumber(bnbAmount))*/
	
	const bnbprice = await getBNBPrice(sushi) //Contract, wbusdContract, BNBBUSDpool
	const MMSPrice = await getMMSPrice(sushi)
	const KtKtPrice = await getKtKtPrice(sushi)
	
	if(lpPool !== BUSDUSDTPair){
		if(lpPool === MMSAddress){
			const lpamout = await getContractBalance(MMSContract, KtKtMasterAddress)	//is MMS only
			const totalStaked = getBalanceNumber(new BigNumber(lpamout)) * MMSPrice
			setTotalStaked(totalStaked)			
		}
		else if(lpPool === KtKtMMSPair){
			const MMSamout = await getContractBalance(MMSContract, lpPool)	//MMS
			const KtKtamout = await getContractBalance(KtKtContract, lpPool)	//KtKt
			const totalStaked = (getBalanceNumber(new BigNumber(MMSamout))*MMSPrice) + (getBalanceNumber(new BigNumber(KtKtamout))*KtKtPrice)
			setTotalStaked(totalStaked)
		}
		else{ // normal
			const lpamout = await getContractBalance(Contract, lpPool)	//all
			const totalStaked = getBalanceNumber(new BigNumber(lpamout)) * bnbprice * 2
			setTotalStaked(totalStaked)
		}
	}
    else{ //stable coin
		const lpamout = await getContractBalance(wbusdContract, lpPool)	
		const totalStaked = getBalanceNumber(new BigNumber(lpamout)) * 2
		setTotalStaked(totalStaked)
	}
	
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

import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'

import { getWethContract, getContractBalance, getBalanceNumber, getBNBPrice, getBUSDUSDTPair, getWbusdContract, getLPAddressByPid, getMasterChefContract, getMMSAddress, getMMSPrice, getMMSContract, getMasterChefAddress, getKtKtMMSPair, getSushiContract, getKtKtPrice} from '../sushi/utils' //getBNBBUSDPair
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
  const Contract = getWethContract(sushi)
  const wbusdContract = getWbusdContract(sushi)
  const BUSDUSDTPair = getBUSDUSDTPair(sushi)
  const MasterContract = getMasterChefContract(sushi)
  const MMSAddress = getMMSAddress(sushi)
  const MMSContract = getMMSContract(sushi)
  const KtKtMasterAddress = getMasterChefAddress(sushi)
  const KtKtMMSPair = getKtKtMMSPair(sushi)
  const KtKtContract = getSushiContract(sushi)
  //const BNBBUSDpool = getBNBBUSDPair(sushi)

  const fetchBalance = useCallback(async () => {
	  //return ;//DBG
	const bnbprice = await getBNBPrice(sushi); //Contract, wbusdContract, BNBBUSDpool
	const MMSPrice = await getMMSPrice(sushi)
	const KtKtPrice = await getKtKtPrice(sushi)
	let allValue = 0;
	
	for (let i = 0; i < 15; i++) {
		const lpaddress = await getLPAddressByPid(MasterContract, i)
		if(lpaddress !== BUSDUSDTPair){
			if(lpaddress === MMSAddress){
				const lpamout = await getContractBalance(MMSContract, KtKtMasterAddress)
				const totalStaked = getBalanceNumber(new BigNumber(lpamout)) * MMSPrice
				allValue = allValue + totalStaked
			}
			else if(lpaddress === KtKtMMSPair){
				const MMSamout = await getContractBalance(MMSContract, lpaddress)	//MMS
				const KtKtamout = await getContractBalance(KtKtContract, lpaddress)	//KtKt
				const totalStaked = (getBalanceNumber(new BigNumber(MMSamout))*MMSPrice) + (getBalanceNumber(new BigNumber(KtKtamout))*KtKtPrice)
				allValue = allValue + totalStaked
			}
			else{
				const lpamout = await getContractBalance(Contract, lpaddress)	
				const totalStaked = getBalanceNumber(new BigNumber(lpamout)) * bnbprice * 2
				allValue = allValue + totalStaked
			}
			
		}
		else{
			const lpamout = await getContractBalance(wbusdContract, lpaddress)	
			const totalStaked = getBalanceNumber(new BigNumber(lpamout)) * 2			
			allValue = allValue + totalStaked
		}
	}
	
	setTotalStaked(allValue)	
	
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

import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'

import { getContractBalance, getBalanceNumber, getKtKtPrice, getBNBPrice, getWethContract, getPoolTotalAllocPoint, getPoolAllocPoint, getMasterChefContract, getBUSDUSDTPair, getWbusdContract, getMMSAddress, getMMSPrice, getMMSContract, getMasterChefAddress, getKtKtMMSPair, getSushiContract } from '../sushi/utils' //
//import { getMMSSupply, getMMSContract } from '../sushi/utils'

// hooks
import useSushi from './useSushi'
import useBlock from './useBlock'
import { useActiveWeb3React } from '.'

const useChecking = (lpTokenAddress: string, pid: number) => {
  const [totalApy, setApy] = useState(0)
  const { account } = useActiveWeb3React()
  const sushi = useSushi()  
  const block = useBlock()
  const Contract = getWethContract(sushi)
  const MasterChefContract = getMasterChefContract(sushi)
  const wbusdContract = getWbusdContract(sushi)
  const BUSDUSDTPair = getBUSDUSDTPair(sushi)
  const MMSAddress = getMMSAddress(sushi)
  const MMSContract = getMMSContract(sushi)
  const KtKtMasterAddress = getMasterChefAddress(sushi)
  const KtKtMMSPair = getKtKtMMSPair(sushi)
  const KtKtContract = getSushiContract(sushi)

  const fetchBalance = useCallback(async () => {	

	const allowPoint = await getPoolAllocPoint(MasterChefContract, pid)
	const totalPoint = await getPoolTotalAllocPoint(MasterChefContract)
	const NumberPoolWeight = allowPoint / totalPoint
	
	const KtKtPrice = await getKtKtPrice(sushi)
	const bnbprice = await getBNBPrice(sushi)
	const MMSPrice = await getMMSPrice(sushi)
	
	const blockPerYear = 10512000
	const KtKtPerBlock = 0.14 //KtKt per year (earlt maker 1532160) //0.14
	
	if(lpTokenAddress !== BUSDUSDTPair){
		if(lpTokenAddress === MMSAddress){ //MMS
			const lpamout = await getContractBalance(MMSContract, KtKtMasterAddress)
			const totalStaked = getBalanceNumber(new BigNumber(lpamout)) * MMSPrice
			const totalApy = ((KtKtPrice * blockPerYear * KtKtPerBlock * NumberPoolWeight) / totalStaked)*100
			setApy(totalApy)
		}
		else if(lpTokenAddress === KtKtMMSPair){
			const MMSamout = await getContractBalance(MMSContract, lpTokenAddress)	//MMS
			const KtKtamout = await getContractBalance(KtKtContract, lpTokenAddress)	//KtKt
			const totalMMSStaked = getBalanceNumber(new BigNumber(MMSamout)) * MMSPrice
			const totalKtKtStaked = getBalanceNumber(new BigNumber(KtKtamout)) * KtKtPrice
			
			const totalStaked = totalMMSStaked + totalKtKtStaked
			
			const totalApy = ((KtKtPrice * blockPerYear * KtKtPerBlock * NumberPoolWeight) / totalStaked)*100
			setApy(totalApy)
		}
		else{ //normal		
			const lpamout = await getContractBalance(Contract, lpTokenAddress)	
			const totalStaked = getBalanceNumber(new BigNumber(lpamout)) * bnbprice * 2 //bnb in pool		
			const totalApy = ((KtKtPrice * blockPerYear * KtKtPerBlock * NumberPoolWeight) / totalStaked)*100
			setApy(totalApy)
		}		
	}
	else{
		const lpamout = await getContractBalance(wbusdContract, lpTokenAddress)
		const totalStaked = getBalanceNumber(new BigNumber(lpamout)) * 2 //busd in pool		
		const totalApy = ((KtKtPrice * blockPerYear * KtKtPerBlock * NumberPoolWeight) / totalStaked)*100
		setApy(totalApy)
	}
	
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

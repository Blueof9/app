import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000
  }
}

export const getMasterChefAddress = sushi => {
  return sushi && sushi.masterChefAddress
}
export const getSushiAddress = sushi => {
  return sushi && sushi.sushiAddress
}
export const getEthAddress = sushi => {
  return sushi && sushi.wethAddress
}
export const getBusdAddress = sushi => {
  return sushi && sushi.wbusdAddress
}
export const getMMSAddress = KtKt => {
  return KtKt && KtKt.MMSAddress
}
export const getMMSMasterAddress = KtKt => {
  return KtKt && KtKt.MMSMaster
}
export const getBNBBUSDPair = KtKt => {
  return KtKt && KtKt.BNBBUSDPair
}
export const getMMSBNBPair = KtKt => {
  return KtKt && KtKt.MMSBNBPair
}
export const getKtKtBNBPair = KtKt => {
  return KtKt && KtKt.KtKtBNBPair
}
export const getBUSDUSDTPair = KtKt => {
  return KtKt && KtKt.BUSDUSDTPair
}
export const getKtKtMMSPair = KtKt => {
  return KtKt && KtKt.KtKtMMSPair
}
export const getWethContract = sushi => {
  return sushi && sushi.contracts && sushi.contracts.weth
}
export const getWbusdContract = sushi => {
  return sushi && sushi.contracts && sushi.contracts.wbusd
}

export const getMasterChefContract = sushi => {
  return sushi && sushi.contracts && sushi.contracts.masterChef
}
export const getSushiContract = sushi => {
  return sushi && sushi.contracts && sushi.contracts.sushi
}
export const getMMSContract = KtKt => {
  return KtKt && KtKt.contracts && KtKt.contracts.MMS
}
export const getMMSMasterContract = KtKt => {
  return KtKt && KtKt.contracts && KtKt.contracts.MMSMaster
}

export const getFarms = sushi => {
  return sushi
    ? sushi.contracts.pools.map(
        ({ pid, name, symbol, icon, tokenAddress, tokenSymbol, tokenContract, lpAddress, lpContract, bonus, base }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          earnToken: 'KtKt',
          earnTokenAddress: sushi.contracts.sushi.options.address,
          icon,
		  bonus,
          base
        })
      )
    : []
}

export const getPoolWeight = async (masterChefContract, pid) => {
    //return 0;//DBG
  const { allocPoint }  = await masterChefContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await masterChefContract.methods.totalAllocPoint().call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}
export const getPoolAllocPoint = async (masterChefContract, pid) => {
    //return 0; //DBG
  const { allocPoint } = await masterChefContract.methods.poolInfo(pid).call()
  return allocPoint
}
export const getPoolTotalAllocPoint = async (masterChefContract) => {
    //return 0;//DBG
  const totalAllocPoint = await masterChefContract.methods.totalAllocPoint().call()
  return totalAllocPoint
}
export const getLPAddressByPid = async (masterChefContract, pid) => {
  const { lpToken } = await masterChefContract.methods.poolInfo(pid).call()
  return lpToken
}

export const getEarned = async (masterChefContract, pid, account) => {

	let startTime = 1602766800  //15-10 20.00
	if(pid === 14){ //KtKt-MMS
		startTime = 1603692000 //21-10 22.00
	}
	const poolActive = startTime * 1000 - Date.now() <= 0
	let balance = 0

	//if(poolActive){
		balance = masterChefContract.methods.pendingKtKt(pid, account).call();
	//}
    //console.log('getEarned', poolActive);
  return balance
}
export const getMMSEarned = async (masterChefContract, pid, account) => {
    //return 0;//DBG
  return masterChefContract.methods.pendingMMS(pid, account).call()
}

export const getTotalLPWethValue = async (masterChefContract, wethContract, lpContract, tokenContract, pid) => {
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods.balanceOf(lpContract.options.address).call()

  const tokenDecimals = await tokenContract.methods.decimals().call()
  // Get the share of lpContract that masterChefContract owns
  const balance = await lpContract.methods.balanceOf(masterChefContract.options.address).call()
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()
  // Get total weth value for the lpContract = w1
  const lpContractWeth = await wethContract.methods.balanceOf(lpContract.options.address).call()
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpWethWorth = new BigNumber(lpContractWeth)
  const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP).times(portionLp).div(new BigNumber(10).pow(tokenDecimals))

  const wethAmount = new BigNumber(lpContractWeth).times(portionLp).div(new BigNumber(10).pow(18))

  const poolWeight = await getPoolWeight(masterChefContract, pid)

  return {
    tokenAmount,
    wethAmount,
    totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWeth: wethAmount.div(tokenAmount),
    poolWeight,
	totalSupply
  }
}

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256.toString())
    .send({ from: account })
}

export const approveMMS = async (KtKtContract, MMSContract, account) => {
  return KtKtContract.methods
    .approve(MMSContract.options.address, ethers.constants.MaxUint256.toString())
    .send({ from: account })
}

export const getKtKtBurn = async sushi => {
    //return new BigNumber(0);//DBG
	return new BigNumber(await sushi.contracts.sushi.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call())
}

export const getMMSBurn = async sushi => {
    //return new BigNumber(0);//DBG
	return new BigNumber(await sushi.contracts.MMS.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call())
}

export const getSushiSupply = async sushi => {
    //return BigNumber(0); //DBG
	const burn = new BigNumber(await sushi.contracts.sushi.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call())
	const allSupply = new BigNumber(await sushi.contracts.sushi.methods.totalSupply().call())
	const total = allSupply - burn
	
    return new BigNumber(total)
}

export const getMMSSupply = async sushi => {
    //return new BigNumber(0);//DBG
	const burn = new BigNumber(await sushi.contracts.MMS.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call())
	const allSupply = new BigNumber(await sushi.contracts.MMS.methods.totalSupply().call())
	const total = allSupply - burn
	
	return new BigNumber(total)
}

export const stake = async (masterChefContract, pid, amount, account, ref) => {
  return masterChefContract.methods
    .deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(), ref)
    .send({ from: account })
    .on('transactionHash', tx => {
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', tx => {
      return tx.transactionHash
    })
}

export const getMMS = async (MMSContract, account) => {
  return MMSContract.methods.balanceOf(account).call()
}

export const getPendingMMS = async (MMSContract, account) => {
  return MMSContract.methods.pendingMMS().call()
}
export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .deposit(pid, '0', '0x0000000000000000000000000000000000000000')
    .send({ from: account })
    .on('transactionHash', tx => {
      return tx.transactionHash
    })
}

export const getStaked = async (masterChefContract, pid, account) => {
    //return new BigNumber(0);//DBG
  try {
    const { amount } = await masterChefContract.methods.userInfo(pid, account).call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

//Add function
export const getBalanceNumber = (balance, decimals = 18) => {
    //return 0;//DBG
  const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals))
  return displayBalance.toNumber()
}

export const getContractBalance = async (Contract, address) => {
  return Contract.methods.balanceOf(address).call()
}

export const getBNBPrice = async sushi => {//async (WBNBContract, WBUSDContract, BNBBUSDpool) => {
    //return 0;//DBG
	const WBNBContract = sushi.contracts.weth
	const WBUSDContract = sushi.contracts.wbusd
	const BNBBUSDpool = sushi.BNBBUSDPair
	
	const bnbAmount = await WBNBContract.methods.balanceOf(BNBBUSDpool).call()
	const busdAmount = await WBUSDContract.methods.balanceOf(BNBBUSDpool).call()
	const bnbprice = getBalanceNumber(new BigNumber(busdAmount))/getBalanceNumber(new BigNumber(bnbAmount))
	return bnbprice
}

export const getKtKtPrice = async sushi => {
    return 0;//DBG
	const WBNBContract = sushi.contracts.weth
	const KtKtContract = sushi.contracts.sushi
	const KtKtBNBPair = sushi.KtKtBNBPair
	const bnbPrice = await getBNBPrice(sushi)	
	
	const bnbAmount = await WBNBContract.methods.balanceOf(KtKtBNBPair).call() //get bnb in pair
	const KtKtAmount = await KtKtContract.methods.balanceOf(KtKtBNBPair).call() //get KtKt in pair
	const KtKtPrice = getBalanceNumber(new BigNumber(bnbAmount))/getBalanceNumber(new BigNumber(KtKtAmount)) * bnbPrice
	return KtKtPrice
}

export const getMMSPrice = async sushi => {
    return 0;//DBG
	const WBNBContract = sushi.contracts.weth
	const MMSContract = sushi.contracts.MMS
	const MMSBNBPair = sushi.MMSBNBPair
	const bnbPrice = await getBNBPrice(sushi)
	
	const bnbAmount = await WBNBContract.methods.balanceOf(MMSBNBPair).call() //get bnb in pair
	const MMSAmount = await MMSContract.methods.balanceOf(MMSBNBPair).call() //get MMS in pair
	const MMSPrice = getBalanceNumber(new BigNumber(bnbAmount))/getBalanceNumber(new BigNumber(MMSAmount)) * bnbPrice
	return MMSPrice
}

//------------------
export const redeem = async (masterChefContract, account) => {
  const now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return masterChefContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', tx => {
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}

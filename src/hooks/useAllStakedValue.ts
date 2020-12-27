import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'

import { getMasterChefContract, getWethContract, getFarms, getTotalLPWethValue } from '../sushi/utils'

import useSushi from './useSushi'
import useBlock from './useBlock'
import { useActiveWeb3React } from '.'

export interface StakedValue {
  tokenAmount: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
  poolWeight: BigNumber
  lpBalanceOfMaster: BigNumber
  totalSupply: BigNumber
}

const useAllStakedValue = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account } = useActiveWeb3React()
  const sushi = useSushi()
  const farms = getFarms(sushi)
  const masterChefContract = getMasterChefContract(sushi)
  const wethContact = getWethContract(sushi)
  const block = useBlock()

  const fetchAllStakedValue = useCallback(async () => {
    const newBalances: Array<StakedValue> = await Promise.all(
      farms.map(
        ({
          lpContract,
          tokenContract,
          pid
        }: {
          lpTokenAddress: string
          lpContract: Contract
          tokenContract: Contract
          pid: number
        }) => getTotalLPWethValue(masterChefContract, wethContact, lpContract, tokenContract, pid)
      )
    )

    setBalance(newBalances)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, masterChefContract, sushi])

  useEffect(() => {
    if (account && masterChefContract && sushi) {
      fetchAllStakedValue()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, block, masterChefContract, setBalance, sushi])

  return balances
}

export default useAllStakedValue

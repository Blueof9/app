import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { provider } from 'web3-core'
import { useActiveWeb3React } from '.'
import { getBalance } from '../utils/erc20'
import useBlock from './useBlock'

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, library } = useActiveWeb3React()
  const ethereum = library?.provider
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getBalance(ethereum as provider, tokenAddress, account as string)
    setBalance(new BigNumber(balance))
  }, [account, ethereum, tokenAddress])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, setBalance, block, tokenAddress, fetchBalance])

  return balance
}

export default useTokenBalance

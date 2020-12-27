import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useActiveWeb3React } from '.'
import useSushi from './useSushi'
import useBlock from './useBlock'
import { getEarned, getMasterChefContract, getFarms } from '../sushi/utils'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account } = useActiveWeb3React()
  const sushi = useSushi()
  const farms = getFarms(sushi)
  const masterChefContract = getMasterChefContract(sushi)
  const block = useBlock()
  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) => getEarned(masterChefContract, pid, account))
    )

    setBalance(balances)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, masterChefContract, sushi])

  useEffect(() => {
    if (account && masterChefContract && sushi) {
      fetchAllBalances()
    }
  }, [account, block, masterChefContract, setBalance, sushi, fetchAllBalances])

  return balances
}

export default useAllEarnings

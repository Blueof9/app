import { useCallback, useEffect, useState } from 'react'
//import BigNumber from 'bignumber.js'

import { getMMSPrice } from '../sushi/utils' //

// hooks
import useSushi from './useSushi'
import useBlock from './useBlock'
import { useActiveWeb3React } from '.'

const useChecking = () => {
  const [totalPrice, setPrice] = useState(0)
  const { account } = useActiveWeb3React()
  const sushi = useSushi()  
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
	
	const totalPrice = await getMMSPrice(sushi)
	
    setPrice(totalPrice)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, sushi])

  useEffect(() => {
    if (account && sushi) {
      fetchBalance()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, setPrice, block, sushi])

  return totalPrice
}

export default useChecking

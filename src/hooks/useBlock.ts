import { useEffect, useState } from 'react'
import Web3 from 'web3'
import { useActiveWeb3React } from '.'
import { provider } from 'web3-core'

const useBlock = () => {
  const [block, setBlock] = useState(0)
  const { library } = useActiveWeb3React()
  const ethereum = library?.provider

  useEffect(() => {
    if (!ethereum) return
    const web3 = new Web3(ethereum as provider)

    const interval = setInterval(async () => {
      const latestBlockNumber = await web3.eth.getBlockNumber()
      if (block !== latestBlockNumber) {
        setBlock(latestBlockNumber)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [ethereum, block])

  return block
}

export default useBlock

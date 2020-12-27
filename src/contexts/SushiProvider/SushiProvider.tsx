import React, { createContext, useEffect, useState } from 'react'

import { useActiveWeb3React } from '../../hooks'

import { Sushi } from '../../sushi'

export interface SushiContext {
  sushi?: typeof Sushi
}

export const Context = createContext<SushiContext>({
  sushi: undefined
})

declare global {
  interface Window {
    sushisauce: any
  }
}

const SushiProvider: React.FC = ({ children }) => {
  const { library, chainId, account } = useActiveWeb3React()
  const [sushi, setSushi] = useState<any>()
  const provider = library?.provider

  // @ts-ignore
  window.sushi = sushi
  // @ts-ignore
  window.eth = provider

  useEffect(() => {
    if (account && chainId && provider) {
      const sushiLib = new Sushi(provider, chainId, false, {
        defaultAccount: account,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000
      })
      setSushi(sushiLib)
      window.sushisauce = sushiLib
    }
  }, [library, chainId, account])

  return <Context.Provider value={{ sushi }}>{children}</Context.Provider>
}

export default SushiProvider

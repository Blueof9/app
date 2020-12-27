// TODO: Switch constants to BSC tokens..
import { ChainId, JSBI, Percent, Token, WETH } from '@uniswap/sdk'
import { AbstractConnector } from '@web3-react/abstract-connector'

import { injected, injectedBsc } from '../connectors'

export const ROUTER_ADDRESS = '0xB6fdd734f6180568F604E0fF2e597677c1E36918' // testnet

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId | any]: Token[]
}

export const DAI = new Token(1, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin')
export const USDC = new Token(1, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C')
export const USDT = new Token(1, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD')
export const COMP = new Token(1, '0xc00e94Cb662C3520282E6f5717214004A7f26888', 18, 'COMP', 'Compound')
export const MKR = new Token(1, '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', 18, 'MKR', 'Maker')
export const AMPL = new Token(1, '0xD46bA6D942050d489DBd938a2C909A5d5039A161', 9, 'AMPL', 'Ampleforth')

export const B_DAI = new Token(56, '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3', 18, 'DAI', 'Dai Token')
export const BUSD = new Token(56, '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18, 'BUSD', 'BUSD Token')
export const B_USDT = new Token(56, '0x55d398326f99059fF775485246999027B3197955', 18, 'USDT', 'Tether USD')

export const T_DAI = new Token(1337, '0xEC5dCb5Dbf4B114C9d0F65BcCAb49EC54F6A0867', 18, 'DAI', 'Dai Token')
export const T_BUSD = new Token(1337, '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee', 6, 'BUSD', 'BUSD Token')
export const T_USDT = new Token(1337, '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd', 6, 'USDT', 'Tether USD')
export const T_KtKt = new Token(1337, '0x5A7d5d874A088fAEcb09100668478627FD315c31', 18, 'KtKt', 'KtKtToken')
export const T_MMS = new Token(1337, '0xa4AB53DEf6865FeF6338b03dF326c2593146a715', 18, 'MMS', 'MMSToken')

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.ROPSTEN]: [WETH[ChainId.ROPSTEN]],
  [ChainId.RINKEBY]: [WETH[ChainId.RINKEBY]],
  [ChainId.GÖRLI]: [WETH[ChainId.GÖRLI]],
  [ChainId.KOVAN]: [WETH[ChainId.KOVAN]],
  [ChainId.BSC_TESTNET]: [WETH[ChainId.BSC_TESTNET]]
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  //[ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT, COMP, MKR],
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], B_DAI, BUSD, B_USDT]
  //[ChainId.BSC_TESTNET]: [...WETH_ONLY[ChainId.BSC_TESTNET], T_KtKt, T_MMS, T_USDT, T_BUSD]
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId | any]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {
    [AMPL.address]: [DAI, WETH[ChainId.MAINNET]]
  }
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  //[ChainId.BSC_MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT],
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], B_USDT, BUSD, B_DAI]
  //[ChainId.BSC_TESTNET]: [...WETH_ONLY[ChainId.BSC_TESTNET], T_KtKt, T_MMS, T_USDT, T_BUSD]
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  //1: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT],
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], B_USDT, BUSD, B_DAI]
  //[ChainId.BSC_TESTNET]: [...WETH_ONLY[ChainId.BSC_TESTNET], T_USDT, T_BUSD, T_DAI]
}

export const PINNED_PAIRS: { readonly [chainId in ChainId | any]?: [Token, Token][] } = {
  1: [
    [
      new Token(ChainId.MAINNET, '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', 8, 'cDAI', 'Compound Dai'),
      new Token(ChainId.MAINNET, '0x39AA39c021dfbaE8faC545936693aC917d5E7563', 8, 'cUSDC', 'Compound USD Coin')
    ],
    [USDC, USDT],
    [DAI, USDT]
  ]
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  BINANCE_CHAIN: {
    connector: injectedBsc,
    name: 'BinanceChain Wallet',
    iconName: 'binancechainwallet.png',
    description: 'Binance SmartChain official wallet',
    href: null,
    color: '#F0B90B'
  }
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
export const BETTER_TRADE_LINK_THRESHOLD = new Percent(JSBI.BigInt(75), JSBI.BigInt(10000))

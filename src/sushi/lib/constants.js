import BigNumber from 'bignumber.js/bignumber'

//import logoIcon from '../../assets/images/logo-icon.png'
//import MMSlogo from '../../assets/images/MMSlogo.png'

export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber('115792089237316195423570985008687907853269984665640564039457584007913129639935'), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18')
}

export const addressMap = {
  uniswapFactory: '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95',
  uniswapFactoryV2: '0xDEBA8b1314dC39c796B0035b88EB921A0A49e768',
  YFI: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
  YCRV: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
  UNIAmpl: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  UNIRouter: '0x21aae3C7e8b13d857d60f41DE7517c29a7FD8FF0',
  LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  MKR: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
  SNX: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
  COMP: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
  LEND: '0x80fB784B7eD66730e8b1DBd9820aFD29931aab03',
  SUSHIYCRV: '0x2C7a51A357d5739C5C74Bf3C96816849d2c9F726'
}

export const contractAddresses = {
  sushi: {
    56: '0x0fc66737417f44ED3484f438c77AB92Fda18A3ee', // KtKtToken
    97: '0x8B90a8dbB1034c60604A4c84F41F73b2e0Efa55b' // KtKtToken
  },
  masterChef: {
    56: '0x5162e4d2c22cC309771455D967518b6746E74691', // KtKtMaster
    97: '0x3250473651873b047DD940a4758575E5F7683C2e' // KtKtMaster
  },
  weth: {
    56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    97: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd'
  },
  MMS: {
    56: '0x5dD9b8805abDC763582B21f95ed119FC26b13c05',
    97: '0xcE3F24A1e463E6Dc1E949F2a28d65d7b975F008E'
  },
  MMSMaster: {
    56: '0x8B90a8dbB1034c60604A4c84F41F73b2e0Efa55b',
    97: '0x03CABF35B4a17cecEC4fa8Dc148C5E3Cf53645fa'
  },
  wbusd: { //token0=WBNB token1=BUSD
    56: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', // SLDP
      // testnet busd 0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee
      // testnet wbnb 0xae13d989dac2f0debff460ac112a837c89baa7cd
    97: '0x68ae4cdac2ed51d83c4fbaab342e0dfe608a7ff2' // WBNB-BUSD-LP
  },
  BNBBUSDPair: {
    56: '0xE4a6A0BaD98cC14c009d189f0a1b75b4ca8DDB69',
    97: '0x68ae4cdac2ed51d83c4fbaab342e0dfe608a7ff2' // WBNB-BUSD-LP
  },
  MMSBNBPair: {
    56: '0x1938703cF9671fabA2929B3bcD9384CA172750f4',
    97: '0x0'
  },
  KtKtBNBPair: {
    56: '0xCe81e8a090fbeCc8258a650D81c378472D3276CD',
    97: '0x0'
  },
  BUSDUSDTPair: {
    56: '0xe3BEfEb892e339cebDEaf84F923aB43B34A6aa27',
    97: '0x0'
  },
  KtKtMMSPair: {
    56: '0xc13981589b92ac451b363a055F376dF83Bd8716D',
    97: '0x0'
  }
}

/*
UNI-V2 LP Address on mainnet for reference
==========================================
0  USDT 0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852
1  USDC 0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc
2  DAI  0xa478c2975ab1ea89e8196811f51a7b7ade33eb11
3  sUSD 0xf80758ab42c3b07da84053fd88804bcb6baa4b5c
4  COMP 0xcffdded873554f362ac02f8fb1f02e5ada10516f
5  LEND 0xab3f9bf1d81ddb224a2014e98b238638824bcf20
6  SNX  0x43ae24960e5534731fc831386c07755a2dc33d47
7  UMA  0x88d97d199b9ed37c29d846d00d443de980832a22
8  LINK 0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974
9  BAND 0xf421c3f2e695c2d4c0765379ccace8ade4a480d9
10 AMPL 0xc5be99a02c6857f9eac67bbce58df5572498f40c
11 YFI  0x2fdbadf3c4d5a8666bc06645b8358ab803996e28
12 SUSHI 0xce84867c3c02b05dc570d0135103d3fb9cc19433
*/

export const supportedPools = [

  {
    pid: 0,
    lpAddresses: {
      56: '0x1d05072d22270bde9ae2eb55eeddc5d2753ff27e', // UniswapV2Pair
      97: '0x1d05072d22270bde9ae2eb55eeddc5d2753ff27e'
    },
    tokenAddresses: {
      56: '0x0fc66737417f44ED3484f438c77AB92Fda18A3ee', // KtKtToken
      97: '0x0fc66737417f44ED3484f438c77AB92Fda18A3ee'
    },
    base: 'BNB',
    name: 'KtKt/BNB',
    symbol: 'KtKt-BNB-cLP',
    tokenSymbol: 'KtKt',
    icon: 'https://gateway.pinata.cloud/ipfs/QmSSCZyCq4cPUw2ovWmqaPBbZ1VokqKDWevNqWupMSrBC1',
	bonus: 1
  },
  { // ok
    pid: 1,
    lpAddresses: {
      56: '0x39d7f9c08d797a70d37801c8cddec9b65d938359'
    },
    tokenAddresses: {
      56: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'
    },
    base: 'BNB',
    name: 'BUSD',
    symbol: 'BUSD-BNB-LP',
    tokenSymbol: 'BUSD',
    icon: 'https://bscscan.com/token/images/busd_32.png',
    bonus: 1//5
  },
  /*
{
  pid: 1,
  lpAddresses: {
      56: '0x4330c48206b15b19c9b6f1b1ebe331ad9d55d1bc'
  },
  tokenAddresses: {
    56: '0x0fc66737417f44ED3484f438c77AB92Fda18A3ee'
  },
  base: 'BNB',
  name: 'KtKt/BNB',
  symbol: 'KtKt-BNB-Cake-LP',
  tokenSymbol: 'KtKt',
  icon: 'https://gateway.pinata.cloud/ipfs/QmeJdurtQS8DvZdbP6G2PDfxjndYNKAy3tHAsDaH9RqozX',
  bonus: 0//10
},

{
  pid: 9,
  lpAddresses: {
    56: '0x1938703cF9671fabA2929B3bcD9384CA172750f4'
  },
  tokenAddresses: {
    56: '0x5dD9b8805abDC763582B21f95ed119FC26b13c05'
  },
  base: 'BNB',
  name: 'MMS/BNB',
  symbol: 'MMS-BNB-LP',
  tokenSymbol: 'MMS',
  icon: 'https://gateway.pinata.cloud/ipfs/QmdKGuTvtEKMjAaozZhqyRZutkSUUZSHLY1UFWhMvYsoKR',
  bonus: 0// 5
},
{ // ok
  pid: 10,
  lpAddresses: {
    56: '0x5dD9b8805abDC763582B21f95ed119FC26b13c05'
  },
  tokenAddresses: {
    56: '0x5dD9b8805abDC763582B21f95ed119FC26b13c05'
  },
  base: 'MMS',
  name: 'MMSToken',
  symbol: 'MMS',
  tokenSymbol: 'MMS',
  icon: 'https://gateway.pinata.cloud/ipfs/QmdKGuTvtEKMjAaozZhqyRZutkSUUZSHLY1UFWhMvYsoKR',
  bonus: 5
},
{ // ok
  pid: 11,
  lpAddresses: {
    56: '0xE9992F50d9dCE28e7d391E6234b3c7444dE385Dc'
  },
  tokenAddresses: {
    56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'
  },
  base: 'BNB',
  name: 'PancakeSwap Token',
  symbol: 'CAKE-BNB-LP',
  tokenSymbol: 'CAKE',
  icon: 'https://bscscan.com/token/images/pancake_32.png',
  bonus: 3
},
{
  pid: 1,
  lpAddresses: {
    56: '0xa3A42BF5504E6BA6A2EF479E82f4817df4730b55'
  },
  tokenAddresses: {
    56: '0xad6caeb32cd2c308980a548bd0bc5aa4306c6c18'
  },
  base: 'BNB',
  name: 'Band Protocol',
  symbol: 'BAND-BNB-LP',
  tokenSymbol: 'BAND',
  icon: 'https://bscscan.com/token/images/bandtoken_32.png',
  bonus: 0
},
{
  pid: 2,
  lpAddresses: {
    56: '0xF38Da74e4b93A784435337F2b0C2c6ee83F665bE'
  },
  tokenAddresses: {
    56: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402'
  },
  base: 'BNB',
  name: 'Polkadot',
  symbol: 'DOT-BNB-LP',
  tokenSymbol: 'DOT',
  icon: 'https://bscscan.com/token/images/polkadot_32.png',
  bonus: 0
},
{
  pid: 3,
  lpAddresses: {
    56: '0x166586dB1702F17AdE621298593685e297B341C3'
  },
  tokenAddresses: {
    56: '0x56b6fb708fc5732dec1afc8d8556423a2edccbd6'
  },
  base: 'BNB',
  name: 'EOS',
  symbol: 'EOS-BNB-LP',
  tokenSymbol: 'EOS',
  icon: 'https://bscscan.com/token/images/eos_32.png',
  bonus: 0
},
{
  pid: 4,
  lpAddresses: {
    56: '0x172Dd42E60521D0D1a15A2A980F46388b7311d56'
  },
  tokenAddresses: {
    56: '0xf8a0bf9cf54bb92f17374d9e9a321e6a111a51bd'
  },
  base: 'BNB',
  name: 'Chainlink',
  symbol: 'LINK-BNB-LP',
  tokenSymbol: 'LINK',
  icon: 'https://bscscan.com/token/images/chainlink_32.png',
  bonus: 0
},
{ // ok
  pid: 5,
  lpAddresses: {
    56: '0xe3BEfEb892e339cebDEaf84F923aB43B34A6aa27'
  },
  tokenAddresses: {
    56: '0x55d398326f99059ff775485246999027b3197955'
  },
  base: 'BNB',
  name: 'BUSD/USDT',
  symbol: 'BUSD-USDT LP',
  tokenSymbol: 'USDT',
  icon: 'https://bscscan.com/token/images/tether_32.png',
  bonus: 1
},
{
  pid: 6,
  lpAddresses: {
    56: '0x187c72A8459596b83D33070DaFC492b818003DA0'
  },
  tokenAddresses: {
    56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8'
  },
  base: 'BNB',
  name: 'Ethereum',
  symbol: 'ETH-BNB-LP',
  tokenSymbol: 'ETH',
  icon: 'https://bscscan.com/token/images/ethereum_32.png',
  bonus: 0
},
{
  pid: 7,
  lpAddresses: {
    56: '0xF4b3Db39A816983741a72Ec90E155FB694A8c39B'
  },
  tokenAddresses: {
    56: '0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe'
  },
  base: 'BNB',
  name: 'Ripple',
  symbol: 'XRP-BNB-LP',
  tokenSymbol: 'XRP',
  icon: 'https://bscscan.com/token/images/xrp_32.png',
  bonus: 0
},
{
  pid: 12,
  lpAddresses: {
    56: '0x922FB5a0eC67dB3b4263dA56C8Ef938De68263DB'
  },
  tokenAddresses: {
    56: '0x4b0f1812e5df2a09796481ff14017e6005508003'
  },
  base: 'BNB',
  name: 'Trust Wallet',
  symbol: 'TWT-BNB-LP',
  tokenSymbol: 'TWT',
  icon: 'https://bscscan.com/token/images/trust_32.png',
  bonus: 0
},
{
  pid: 13,
  lpAddresses: {
    56: '0xFCd2Be01d7F1F7A45DA0A2B3b29BCC494AB6c0d2'
  },
  tokenAddresses: {
    56: '0xa1faa113cbe53436df28ff0aee54275c13b40975'
  },
  base: 'BNB',
  name: 'AlphaToken',
  symbol: 'ALPHA-BNB-LP',
  tokenSymbol: 'ALPHA',
  icon: 'https://bscscan.com/token/images/alpha_32.png',
  bonus: 0
}

   */
]

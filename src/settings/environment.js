import { providers } from "ethers";
import { MAINNET_ABI } from "../onchain/mainnet-abi";
import { MAINNET_CONFIG, MAINNET_DOMAIN } from "../onchain/mainnet-config";
import { TESTNET_ABI } from "../onchain/testnet-abi";
import { TESTNET_CONFIG, TESTNET_DOMAIN } from "../onchain/testnet-config";

//develop local
export const local = {
  ENVIRONMENT: "LOCAL",
  API: `http://localhost:5001/api/v1`,
  // API: `https://apiinfinity.feliciastation.com/api/v1`,
  CAPTCHA_KEY: `6LfFLgIeAAAAAAclTDxmyP3juN4Wj-TeNI_7jl30`,
  GOOGLE_SIGN_IN_CLIENT_KEY: `655245171305-0pfnhphdi1gp33s1ejpgo2qem4matjc7.apps.googleusercontent.com`,
  RI_SLOT_LIMIT: 6,
  ETHERSCAN_LINK: "https://testnet.bscscan.com",
  DEFAULT_PROVIDER: new providers.JsonRpcProvider("https://rpc.ankr.com/bsc"),
  ESCROW_VESTING_CONTRACT_ADDRESS: "0xd1DDAe37c9Cf35c52742b9a5643D386B8930d3C2",
  SPECIAL_ROUND_DEFAULT_PROVIDER: new providers.JsonRpcProvider(
    "https://rpc.ankr.com/bsc"
  ),
  SPECIAL_ROUND_ESCROW_VESTING_CONTRACT_ADDRESS:
    "0x8F2275acaE724c524966813Eb5f710B8FF2e5063",
  image_url: "https://files.infinityangel.io",
  has_minting: true,
  has_listing: true,
  has_buy: true,
  OPEN_FEATURES: {
    isSwap: true,
    isClaim: true,
    hasPresale: true,
  },
  MAIN_MENUS: [
    // {
    //   title: "HOME",
    //   url: ["/"],
    // },
    // {
    //   title: "PRESALE",
    //   url: ["/pre-sale"],
    // },
    {
      title: "MINTING",
      url: ["/minting-box"],
    },
    {
      title: "MARKETPLACE",
      url: ["/marketplace"],
    },
    // {
    //   title: "BOXES",
    //   url: ["/boxes"],
    // },
    // {
    //   title: "SUMMON",
    //   url: ["/summon"],
    //   isLogged: true,
    // },
    {
      title: "R - I",
      url: [
        "/research-institute/R-I",
        "/research-institute/slot",
        "/research-institute/history",
      ],
      isLogged: true,
    },
    {
      title: "SWAP",
      url: ["/swap"],
    },
    {
      title: "SWAP TO ING",
      url: ["/swap-to-ing"],
    },
  ],
  BLOCKCHAIN: {
    ...TESTNET_ABI,
    domain: TESTNET_DOMAIN,
    config: TESTNET_CONFIG,
  },
};

//develop environment
export const develop = {
  ENVIRONMENT: "DEVELOP",
  API: `https://apiinfinity.feliciastation.com/api/v1`,
  CAPTCHA_KEY: `6LfFLgIeAAAAAAclTDxmyP3juN4Wj-TeNI_7jl30`,
  GOOGLE_SIGN_IN_CLIENT_KEY: `655245171305-0pfnhphdi1gp33s1ejpgo2qem4matjc7.apps.googleusercontent.com`,
  RI_SLOT_LIMIT: 6,
  ETHERSCAN_LINK: "https://testnet.bscscan.com",
  DEFAULT_PROVIDER: new providers.JsonRpcProvider("https://rpc.ankr.com/bsc"),
  ESCROW_VESTING_CONTRACT_ADDRESS: "0xd1DDAe37c9Cf35c52742b9a5643D386B8930d3C2",
  SPECIAL_ROUND_DEFAULT_PROVIDER: new providers.JsonRpcProvider(
    "https://rpc.ankr.com/bsc"
  ),
  SPECIAL_ROUND_ESCROW_VESTING_CONTRACT_ADDRESS:
    "0x8F2275acaE724c524966813Eb5f710B8FF2e5063",
  image_url: "https://files.infinityangel.io",
  has_minting: true,
  has_listing: true,
  has_buy: true,
  OPEN_FEATURES: {
    isSwap: true,
    isClaim: true,
    hasPresale: true,
  },
  MAIN_MENUS: [
    // {
    //   title: "HOME",
    //   url: ["/"],
    // },
    // {
    //   title: "PRESALE",
    //   url: ["/pre-sale"],
    // },
    {
      title: "MARKETPLACE",
      url: ["/marketplace"],
    },
    // {
    //   title: "MINTING",
    //   url: ["/minting-box"],
    // },
    // {
    //   title: "BOXES",
    //   url: ["/boxes"],
    // },
    {
      title: "SUMMON",
      url: ["/summon"],
      isLogged: true,
    },
    {
      title: "R - I",
      url: [
        "/research-institute/R-I",
        "/research-institute/slot",
        "/research-institute/history",
      ],
      isLogged: true,
    },
    {
      title: "SWAP",
      url: ["/swap"],
    },
    {
      title: "STAKING",
      url: ["/staking"],
    },
    {
      title: "SWAP_TO_ING",
      url: ["/swap-to-ing"],
    },
  ],
  BLOCKCHAIN: {
    ...TESTNET_ABI,
    domain: TESTNET_DOMAIN,
    config: TESTNET_CONFIG,
  },
};

//staging environment
export const staging = {
  ENVIRONMENT: "STAGING",
  API: `https://marketplace_api.megdev.co/api/v1`,
  CAPTCHA_KEY: `6LfFLgIeAAAAAAclTDxmyP3juN4Wj-TeNI_7jl30`,
  GOOGLE_SIGN_IN_CLIENT_KEY: `655245171305-0pfnhphdi1gp33s1ejpgo2qem4matjc7.apps.googleusercontent.com`,
  RI_SLOT_LIMIT: 6,
  MAIN_MENUS: [
    {
      title: "HOME",
      url: ["/"],
    },
    // {
    //   title: "MINTING",
    //   url: ["/minting-box"],
    // },
    {
      title: "MARKETPLACE",
      url: ["/marketplace"],
    },
    {
      title: "BOXES",
      url: ["/boxes"],
    },
    {
      title: "SUMMON",
      url: ["/summon"],
      isLogged: true,
    },
    {
      title: "R - I",
      url: [
        "/research-institute/R-I",
        "/research-institute/slot",
        "/research-institute/history",
      ],
      isLogged: true,
    },
  ],
  ETHERSCAN_LINK: "https://bscscan.com",
  BLOCKCHAIN: {
    ...MAINNET_ABI,
    domain: MAINNET_DOMAIN,
    config: MAINNET_CONFIG,
  },
};

//special environment (both of develop and production)
export const special = {
  ENVIRONMENT: "SPECIAL",
  API: `https://apiinfinity.feliciastation.com/api/v1`,
  CAPTCHA_KEY: `6LdPQqMhAAAAANaFCYo54sl0FTq5_LtbZnX4a9n9`,
  GOOGLE_SIGN_IN_CLIENT_KEY: `655245171305-0pfnhphdi1gp33s1ejpgo2qem4matjc7.apps.googleusercontent.com`,
  ETHERSCAN_LINK: "https://bscscan.com",
  DEFAULT_PROVIDER: new providers.JsonRpcProvider("https://rpc.ankr.com/bsc"),
  ESCROW_VESTING_CONTRACT_ADDRESS: "0xd1DDAe37c9Cf35c52742b9a5643D386B8930d3C2",
  SPECIAL_ROUND_DEFAULT_PROVIDER: new providers.JsonRpcProvider(
    "https://rpc.ankr.com/bsc"
  ),
  SPECIAL_ROUND_ESCROW_VESTING_CONTRACT_ADDRESS:
    "0x8F2275acaE724c524966813Eb5f710B8FF2e5063",
  MAIN_MENUS: [
    {
      title: "HOME",
      url: ["/"],
    },
    {
      title: "MINTING",
      url: ["/minting-box"],
    },
  ],
  BLOCKCHAIN: {
    ...MAINNET_ABI,
    domain: MAINNET_DOMAIN,
    config: MAINNET_CONFIG,
  },
};

//production environment
export const production = {
  ENVIRONMENT: "PRODUCTION",
  API: `https://marketplace.infinityangel.io/api/v1`,
  CAPTCHA_KEY: `6LdPQqMhAAAAANaFCYo54sl0FTq5_LtbZnX4a9n9`,
  GOOGLE_SIGN_IN_CLIENT_KEY: `655245171305-0pfnhphdi1gp33s1ejpgo2qem4matjc7.apps.googleusercontent.com`,
  RI_SLOT_LIMIT: 3,
  ETHERSCAN_LINK: "https://bscscan.com",
  DEFAULT_PROVIDER: new providers.JsonRpcProvider("https://rpc.ankr.com/bsc"),
  ESCROW_VESTING_CONTRACT_ADDRESS: "0xd1DDAe37c9Cf35c52742b9a5643D386B8930d3C2",
  SPECIAL_ROUND_DEFAULT_PROVIDER: new providers.JsonRpcProvider(
    "https://rpc.ankr.com/bsc"
  ),
  SPECIAL_ROUND_ESCROW_VESTING_CONTRACT_ADDRESS:
    "0x8F2275acaE724c524966813Eb5f710B8FF2e5063",
  image_url: "https://files.infinityangel.io",
  has_minting: true,
  has_listing: true,
  has_buy: true,
  OPEN_FEATURES: {
    isSwap: true,
    isClaim: true,
    hasPresale: false,
  },
  MAIN_MENUS: [
    {
      title: "MARKETPLACE",
      url: ["/marketplace"],
    },
    {
      title: "SUMMON",
      url: ["/summon"],
      isLogged: true,
    },
    {
      title: "R - I",
      url: [
        "/research-institute/R-I",
        "/research-institute/slot",
        "/research-institute/history",
      ],
      isLogged: true,
    },
    {
      title: "SWAP",
      url: ["/swap"],
    },
    {
      title: "STAKING",
      url: ["/staking"],
    },
    {
      title: "SWAP_TO_ING",
      url: ["/swap-to-ing"],
    },
  ],
  BLOCKCHAIN: {
    ...MAINNET_ABI,
    domain: MAINNET_DOMAIN,
    config: MAINNET_CONFIG,
  },
};

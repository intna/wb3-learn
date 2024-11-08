import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks/block-number"
import "@typechain/hardhat"
import("hardhat-gas-reporter")
import("dotenv")
import 'solidity-coverage'

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
const config: HardhatUserConfig = {
  solidity: "0.8.27",
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337
    }
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    noColors: true,
    // coinmarketcap: COINMARKETCAP_API_KEY,
  },
};

export default config;

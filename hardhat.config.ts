import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "./tasks/block-number"
import "@typechain/hardhat"

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337
    }
  },
};

export default config;

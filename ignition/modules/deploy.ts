import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SimpleStorageModule = buildModule("SimpleStorageModule", (m) => {
  // 部署 SimpleStorage 合约
  const simpleStorage = m.contract("SimpleStorage");

  return { simpleStorage };
});

export default SimpleStorageModule;
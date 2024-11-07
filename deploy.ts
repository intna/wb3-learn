import { ethers } from "ethers"
import * as fs from "fs-extra"
import "dotenv/config"

async function main() {
  let gasLimit = 3000000
  let provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
  let wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider)
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8",
  )
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
  console.log("deploying...")
  const contract = await contractFactory.deploy({ gasLimit })
  let currentFavoriteNumber = await contract.retrieve()
  console.log(`Current Favorite Number: ${currentFavoriteNumber}`)
  console.log("Updating favorite number...")
  let transactionResponse = await contract.store(7)
  let transactionReceipt = await transactionResponse.wait()
  currentFavoriteNumber = await contract.retrieve()
  console.log(`New Favorite Number: ${currentFavoriteNumber}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

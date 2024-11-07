import { ethers, run, network } from "hardhat"
import dotenv from "dotenv"

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    console.log("Deploying contracts.......")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deploymentTransaction();
    const contractAddress = await simpleStorage.getAddress()
    if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        await verify(contractAddress, [])
    }
    console.log("Simple Storage deployed to:", contractAddress)

    // Get the current value
    let currentValue = await simpleStorage.retrieve()
    console.log(`Current value: ${currentValue}`)

    // Update the value
    console.log("Updating contract...")
    let transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait() // returns transaction receipt
    currentValue = await simpleStorage.retrieve()
    console.log(`Current value: ${currentValue}`)
}


const verify = async (contractAddress: string, args: any[]) => {
    console.log("Verifying contract...")
    try {

        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args
        })
    } catch (e: any) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.log(e)
        }
    }
}





main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
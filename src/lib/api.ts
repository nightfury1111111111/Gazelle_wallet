import Moralis from 'moralis'

import { TransactionHistoryItemStatusEnum } from './schemas'
import { TransactionHistoryItem } from './types'

/* Moralis init code */
const serverUrl = process.env.MORALIS_SERVER_URL
const appId = process.env.MORALIS_APP_ID
Moralis.start({ serverUrl, appId })

async function fetchTokenBalances(address: string) {
  const options = {
    chain: process.env.MORALIS_CHAIN_NAME,
    address: address,
  }
  const balances = await Moralis.Web3API.account.getTokenBalances(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options as any,
  )
  return balances
}

async function fetchTransactionHistory(address: string) {
  const options = {
    chain: process.env.MORALIS_CHAIN_NAME,
    address: address,
  }
  const apiResponse = await Moralis.Web3API.account.getTransactions(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options as any,
  )
  if (apiResponse) {
    const transactionsOut: TransactionHistoryItem[] = apiResponse.result!.map(
      (tr) => ({
        hash: tr.hash,
        status: TransactionHistoryItemStatusEnum.enum.confirmed,
        type: 'tbd',
        timestamp: Date.parse(tr.block_timestamp),
      }),
    )
    return transactionsOut
  }
  return []
}

// async function sendERC20Token(
//   contract_address: string,
//   send_token_amount: string,
//   to_address: string,
//   wallet: ethers.Wallet,
// ) {
//   const gas_limit = '0x100000'
//   wallet.provider.getGasPrice().then((currentGasPrice) => {
//     const gas_price = ethers.utils.hexlify(parseInt(currentGasPrice))
//     console.log(`gas_price: ${gas_price}`)
//     const erc20_abi = [
//       // Some details about the token
//       'function name() view returns (string)',
//       'function symbol() view returns (string)',

//       // Get the account balance
//       'function balanceOf(address) view returns (uint)',

//       // Send some of your tokens to someone else
//       'function transfer(address to, uint amount)',

//       // An event triggered whenever anyone transfers to someone else
//       'event Transfer(address indexed from, address indexed to, uint amount)',
//     ]

//     if (contract_address) {
//       // general token send
//       const contract = new ethers.Contract(contract_address, erc20_abi, wallet)

//       // How many tokens?
//       const numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
//       console.log(`numberOfTokens: ${numberOfTokens}`)

//       // Send tokens
//       contract.transfer(to_address, numberOfTokens).then((transferResult) => {
//         console.dir(transferResult)
//         alert('sent token')
//       })
//     } // ether send
//     else {
//       const tx = {
//         from: wallet.address,
//         to: to_address,
//         value: ethers.utils.parseEther(send_token_amount),
//         nonce: wallet.provider.getTransactionCount(wallet.address, 'latest'),
//         gasLimit: ethers.utils.hexlify(gas_limit), // 100000
//         gasPrice: gas_price,
//       }
//       console.dir(tx)
//       try {
//         wallet.sendTransaction(tx).then((transaction) => {
//           console.dir(transaction)
//           alert('Send finished!')
//         })
//       } catch (error) {
//         alert('failed to send!!')
//       }
//     }
//   })
// }

export { fetchTokenBalances, fetchTransactionHistory }

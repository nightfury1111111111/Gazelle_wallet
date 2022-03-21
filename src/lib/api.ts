/* eslint-disable no-console */
import { ethers } from 'ethers'
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

async function fetchNativeTokenBalance(address: string) {
  const options = {
    chain: process.env.MORALIS_CHAIN_NAME,
    address: address,
  }
  const apiResponse = await Moralis.Web3API.account.getNativeBalance(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options as any,
  )
  return ethers.BigNumber.from(apiResponse.balance)
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

async function sendNativeToken(
  send_token_amount: string,
  to_address: string,
  wallet: ethers.Wallet,
) {
  const tx = {
    from: wallet.address,
    to: to_address,
    value: ethers.utils.parseEther(send_token_amount),
    nonce: wallet.provider.getTransactionCount(wallet.address, 'latest'),
  }
  console.dir(tx)
  try {
    wallet.sendTransaction(tx).then((transaction) => {
      console.dir(transaction)
      alert('Submitted Transfer Transaction')
    })
  } catch (error) {
    alert('failed to send!!')
  }
}

async function sendERC20Token(
  contract_address: string,
  send_token_amount: string,
  decimals: string,
  to_address: string,
  wallet: ethers.Wallet,
) {
  // const gas_limit = '0x200000'
  const erc20_abi = [
    // Some details about the token
    'function name() view returns (string)',
    'function symbol() view returns (string)',

    // Get the account balance
    'function balanceOf(address) view returns (uint)',

    // Send some of your tokens to someone else
    'function transfer(address to, uint amount)',

    // An event triggered whenever anyone transfers to someone else
    'event Transfer(address indexed from, address indexed to, uint amount)',
  ]

  // general token send
  const contract = new ethers.Contract(contract_address, erc20_abi, wallet)

  // How many tokens?
  const numberOfTokens = ethers.utils.parseUnits(send_token_amount, decimals)
  // console.log(`numberOfTokens: ${numberOfTokens}`)

  // Send tokens
  contract.transfer(to_address, numberOfTokens).then(() => {
    // console.dir(transferResult)
    alert('Submitted ERC20 Transfer Transaction')
  })
}

export {
  fetchTokenBalances,
  fetchNativeTokenBalance,
  fetchTransactionHistory,
  sendERC20Token,
  sendNativeToken,
}

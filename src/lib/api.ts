/* eslint-disable no-console */
import { ethers, Transaction } from 'ethers'
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
  const allTransactions = await fetchAllTransactions(address)
  const ERC20TokenTransfers = await fetchERC20TokenTransactionHistory(address)

  // filter out all transactions in NativeTrokenTransfers which are also in ERC20
  const NativeTokenTransfers = allTransactions.filter((item) => {
    return ERC20TokenTransfers.findIndex((i) => i.hash === item.hash) === -1
  })

  const allTransfers = NativeTokenTransfers.concat(ERC20TokenTransfers)
  allTransfers.sort((a, b) => {
    if (a.timestamp > b.timestamp) {
      return 1
    } else if (a.timestamp === b.timestamp) {
      return 0
    } else {
      return -1
    }
  })
  return allTransfers
}

async function fetchAllTransactions(address: string) {
  const options = {
    chain: process.env.MORALIS_CHAIN_NAME,
    address: address,
  }
  const apiResponse = await Moralis.Web3API.account.getTransactions(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options as any,
  )
  if (apiResponse) {
    console.log('api result')
    console.log(apiResponse.result)
    const transactionsOut: TransactionHistoryItem[] = apiResponse.result!.map(
      (tr) => ({
        hash: tr.hash,
        status: TransactionHistoryItemStatusEnum.enum.confirmed,
        type: 'Native Transfer',
        timestamp: Date.parse(tr.block_timestamp),
      }),
    )
    return transactionsOut
  }
  return []
}

async function fetchERC20TokenTransactionHistory(address: string) {
  const options = {
    chain: process.env.MORALIS_CHAIN_NAME,
    address: address,
  }

  const apiResponse = await Moralis.Web3API.account.getTokenTransfers(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options as any,
  )
  if (apiResponse) {
    const transactionsOut: TransactionHistoryItem[] = apiResponse.result!.map(
      (tr) => ({
        hash: tr.transaction_hash,
        status: TransactionHistoryItemStatusEnum.enum.confirmed,
        type: 'ERC 20 Transfer',
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
  const txSend = {
    from: wallet.address,
    to: to_address,
    value: ethers.utils.parseEther(send_token_amount),
    nonce: wallet.provider.getTransactionCount(wallet.address, 'latest'),
  }
  try {
    const transactionResponse = await wallet.sendTransaction(txSend)
    const txReturn = {
      hash: transactionResponse.hash,
      status: TransactionHistoryItemStatusEnum.enum.pending,
      type: 'Native Transfer',
      timestamp: Date.now(),
    }
    // alert('Submitted Transfer Transaction')
    return txReturn
  } catch (error) {
    console.log(error)
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

  // Send tokens

  try {
    const transaction: Transaction = await contract.transfer(
      to_address,
      numberOfTokens,
    )
    // alert('Submitted ERC20 Transfer Transaction')

    const tx = {
      hash: transaction.hash!,
      status: TransactionHistoryItemStatusEnum.enum.pending,
      type: 'ERC20 Transfer',
      timestamp: Date.now(),
    }
    return tx
  } catch {
    throw Error('Transaction failed')
  }
}

export {
  fetchTokenBalances,
  fetchNativeTokenBalance,
  fetchTransactionHistory,
  sendERC20Token,
  sendNativeToken,
}

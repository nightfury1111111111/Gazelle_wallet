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

export { fetchTokenBalances, fetchTransactionHistory }

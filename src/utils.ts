import { ethers } from 'ethers'

function truncateString(str: string, length: number, ending: string) {
  if (length == null) {
    length = 100
  }
  if (ending == null) {
    ending = '...'
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending
  } else {
    return str
  }
}

async function getHistory(
  provider: ethers.providers.Provider,
  addressOrName: string | Promise<string>,
  startBlock?: ethers.providers.BlockTag,
  endBlock?: ethers.providers.BlockTag,
): Promise<Array<ethers.providers.TransactionResponse>> {
  const transactions: ethers.providers.TransactionResponse[] = []
  for (let i = startBlock as number; i < (endBlock as number); i++) {
    const blockWithTransactions = await provider.getBlockWithTransactions(i)
    if (blockWithTransactions && blockWithTransactions.transactions) {
      blockWithTransactions.transactions.forEach((tx) => {
        if (tx.to === addressOrName || tx.from === addressOrName) {
          transactions.push({
            ...tx,
            timestamp: blockWithTransactions.timestamp,
          })
        }
      })
    }
  }
  return transactions
}

export { truncateString, getHistory }

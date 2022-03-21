/* eslint-disable no-console */
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

// import {
//   NativeBalanceItem as NativeBalanceItemSchema,
//   ERC20BalanceItem as ERC20BalanceItemSchema,
// } from '@/lib/schemas'
import {
  AbstractBalanceItem,
  ERC20BalanceItem,
  NativeBalanceItem,
  TransactionHistoryItem,
} from '@/lib/types'

import {
  fetchTokenBalances,
  fetchNativeTokenBalance,
  fetchTransactionHistory,
  sendERC20Token,
  sendNativeToken,
  // sendERC20Token,
} from '../../../lib/api'
import { truncateString } from '../../../utils'
import { useWallet } from '../../Hooks/useWallet'
import PrimaryButton from '../Buttons/PrimaryButton'
import SecondaryButton from '../Buttons/SecondaryButton'
import ERC20ItemCard from '../ERC20ItemCard'
import SendTokenDropdownMenu from '../SendTokenDropdownMenu'
import TransactionStatusCard from '../TransactionStatusCard'

function WalletOpenScreen() {
  const [nativeBalanceItem, setNativeBalanceItem] =
    useState<NativeBalanceItem | null>()
  const { wallet, setWallet, setWalletCreationFinished } = useWallet() as {
    wallet: ethers.Wallet
    setWallet: React.Dispatch<React.SetStateAction<ethers.Wallet | undefined>>
    setWalletCreationFinished: React.Dispatch<React.SetStateAction<boolean>>
  }
  const [transactionHistory, setTransactionHistory] = useState<
    TransactionHistoryItem[]
  >([])
  const [historicDataFetched, setHistoricDataFetched] = useState(false)
  const [ERC20Assets, setERC20Assets] = useState<ERC20BalanceItem[]>()
  const [selectedToken, setSelectedToken] = useState<
    AbstractBalanceItem | undefined
  >(undefined)
  const [sendTokenAmount, setSendTokenAmount] = useState<string>('0')
  const [sendTokenReceiverAddress, setSendTokenReceiverAddress] =
    useState<string>('')

  const yellow_stroke = chrome.runtime.getURL('images/yellow_stroke.svg')
  const eth_logo = chrome.runtime.getURL('images/eth_logo.png')
  const matic_logo = chrome.runtime.getURL('images/matic_logo.png')

  useEffect(() => {
    async function getTransactions() {
      // const currentBlockNumber = await wallet.provider.getBlockNumber()
      const txs = await fetchTransactionHistory(wallet.address)
      setTransactionHistory(txs.reverse())
      console.log('Historical txs: ', txs)
    }
    async function getERC20Balances() {
      const balances = await fetchTokenBalances(wallet.address)
      setERC20Assets(balances)
      console.log('ERC20 Balance: ', balances)
      return balances
    }
    async function getNativeTokenBalance() {
      const balance = await fetchNativeTokenBalance(wallet.address)
      let balanceItem: NativeBalanceItem

      if (process.env.NODE_ENV == 'development') {
        balanceItem = {
          symbol: 'ETH',
          balance: balance.toString(),
          decimals: '18',
          logo: eth_logo,
          name: 'Ethereum',
          thumbnail: eth_logo,
        }
      } else {
        balanceItem = {
          symbol: 'MATIC',
          balance: balance.toString(),
          decimals: '18',
          logo: matic_logo,
          name: 'MATIC',
          thumbnail: matic_logo,
        }
      }
      setNativeBalanceItem(balanceItem)
      if (selectedToken == null) {
        setSelectedToken(balanceItem)
      }
    }
    if (wallet && wallet.provider && !historicDataFetched) {
      getTransactions()
      getERC20Balances()
      getNativeTokenBalance()
      setHistoricDataFetched(true)
    }
  }, [wallet, historicDataFetched, selectedToken, eth_logo, matic_logo])

  // useEffect(() => {
  //   // if (wallet && wallet.provider && !listenerActive) {
  //   if (wallet && wallet.provider) {
  //     // setListenerActive(true)
  //     console.log('Register new listener')
  //     wallet.provider.on('block', (blockNumber) => {
  //       console.log('New block was minted!', blockNumber)
  //       console.log(wallet.provider)
  //       wallet.provider
  //         .getBalance(wallet.address)
  //         .then((balance) => {
  //           // console.log(balance.toString())
  //           // console.log(ETHBalance.toString())
  //           if (!balance.eq(ETHBalance)) {
  //             setETHBalance(balance)
  //             console.log('Set new Balance')
  //           }
  //         })
  //         // eslint-disable-next-line no-console
  //         .catch(console.error)

  // wallet.provider.getBlockWithTransactions(blockNumber).then((block) => {
  //   const txs: ethers.providers.TransactionResponse[] = []
  //   // block.transactions.forEach((tx) => {
  //   for (const tx of block.transactions) {
  //     // console.log('New minted tx:', tx)
  //     if (tx.to === wallet.address || tx.from === wallet.address) {
  //       txs.push({
  //         ...tx,
  //         timestamp: block.timestamp,
  //       })
  //     }
  //   }
  // })
  //     })
  //   }
  //   return () => {
  //     wallet.provider.removeAllListeners('block')
  //   }
  // }, [wallet, ETHBalance])

  // function sendToken(
  //   contract_address: string,
  //   send_token_amount: string,
  //   to_address: string,
  // ) {
  //   sendERC20Token(contract_address, send_token_amount, to_address, wallet)
  // }

  function onSubmitTransaction() {
    // Create a transaction object
    // setTransactionStatus(1)
    // async function getTransactions() {
    //   // const currentBlockNumber = await wallet.provider.getBlockNumber()
    //   const txs = await fetchTransactionHistory(wallet.address)
    //   setTransactionHistory(txs.reverse())
    //   console.log('Fetched all transactions.', txs)
    // }
    // const tx = {
    //   to: transactionAddress,
    //   // Convert currency unit from ether to wei
    //   value: ethers.utils.parseEther(transactionETHAmount),
    // }
    // Send a transaction
    // if (wallet) {
    //   wallet
    //     .sendTransaction(tx)
    //     .then(async (txObj) => {
    //       // eslint-disable-next-line no-console
    //       console.log('txHash', txObj.hash)
    //       const pendingTx: TransactionHistoryItem = {
    //         hash: txObj.hash,
    //         type: 'tbd',
    //         status: TransactionHistoryItemStatusEnum.enum.pending,
    //         timestamp: Date.now(),
    //       }
    //       setTransactionHistory([...transactionHistory].concat(pendingTx))
    //       wallet.provider.once(txObj.hash, (tx) => {
    //         console.log('transaction mined: ', tx)
    //         getTransactions() // fetch all Transactions
    //       })
    //     })
    //     .catch((error) => {
    //       // set failed transaction
    //       console.log(error)
    //     })
    // }

    if (selectedToken && 'token_address' in selectedToken) {
      sendERC20Token(
        selectedToken.token_address,
        sendTokenAmount,
        selectedToken.decimals,
        sendTokenReceiverAddress,
        wallet,
      )
      console.log('ERC 20 Token sent')
    } else {
      sendNativeToken(sendTokenAmount, sendTokenReceiverAddress, wallet)
      console.log('Native Token sent')
    }
  }

  function onDestroyWallet() {
    chrome.storage.local.remove(['gazelle_wallet'], function () {
      setWallet(undefined)
      setWalletCreationFinished(false)
    })
  }

  return (
    <div>
      <div className="flex flex-row justify-between align-middle">
        <div>
          <div className="text-2xl font-bold">Public Address</div>
          <div className="text-xl">
            {truncateString(wallet.address, 30, '...')}
          </div>
        </div>
        <div className="">
          <div className="text-2xl font-bold">Native Token Balance</div>
          <div className="text-xl">
            {nativeBalanceItem &&
              ethers.utils.formatUnits(
                nativeBalanceItem?.balance,
                nativeBalanceItem?.decimals,
              )}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <SecondaryButton text="Destroy wallet" onClick={onDestroyWallet} />
        </div>
      </div>

      <div className="mt-8 h-32">
        <div
          className="-ml-4 w-fit bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${yellow_stroke})` }}
        >
          <span className="p-4 text-3xl">Assets</span>
        </div>
        <div className="mx-auto mt-4 grid grid-flow-row grid-cols-4 gap-4">
          {ERC20Assets &&
            ERC20Assets.map((asset) => {
              return (
                <ERC20ItemCard key={asset.token_address} ERC20Item={asset} />
              )
            })}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2">
        <div className="mt-8">
          <div
            className="-ml-4 w-fit bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${yellow_stroke})` }}
          >
            <span className="p-4 text-3xl">Send ETH</span>
          </div>

          <form action="" className="w-4/5">
            <div>
              <label
                htmlFor="text"
                className="block text-xl font-medium text-gray-700"
              >
                Token
              </label>
              <div className="mt-1">
                {ERC20Assets && selectedToken && (
                  <SendTokenDropdownMenu
                    balanceItems={[...ERC20Assets, nativeBalanceItem!]}
                    selectedToken={selectedToken!}
                    setSelectedToken={setSelectedToken}
                  />
                )}
              </div>
            </div>
            <div className="mt-2">
              <label
                htmlFor="text"
                className="block text-xl font-medium text-gray-700"
              >
                Public Address
              </label>
              <div className="mt-1">
                <input
                  id="pub_adress"
                  name="pub_adress"
                  type="text"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => setSendTokenReceiverAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-2">
              <label
                htmlFor="text"
                className="block text-xl font-medium text-gray-700"
              >
                Amount
              </label>
              <div className="mt-1">
                <input
                  id="eth_amount"
                  name="eth_amount"
                  type="text"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={(e) => setSendTokenAmount(e.target.value)}
                />
              </div>
            </div>
          </form>
          <div className="mt-4 flex flex-col justify-items-start">
            <PrimaryButton
              text="Submit Transaction"
              onClick={onSubmitTransaction}
            />
          </div>
        </div>

        <div className="mt-8">
          <div
            className="-ml-4 w-fit bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${yellow_stroke})` }}
          >
            <span className="p-4 text-3xl">Transactions</span>
          </div>

          <div className="grid-col1 mt-4 grid space-y-2">
            {transactionHistory &&
              transactionHistory
                .slice(0)
                .reverse()
                .map((tx) => {
                  console.log(tx.status)
                  return (
                    <TransactionStatusCard
                      key={tx.hash}
                      transactionType="Send ETH"
                      transactionDate={new Date(tx.timestamp)}
                      transactionStatus={tx.status}
                    />
                  )
                })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletOpenScreen

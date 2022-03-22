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
    }
    async function getERC20Balances() {
      const balances = await fetchTokenBalances(wallet.address)
      setERC20Assets(balances)
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

  function onSubmitTransaction() {
    if (selectedToken && 'token_address' in selectedToken) {
      sendERC20Token(
        selectedToken.token_address,
        sendTokenAmount,
        selectedToken.decimals,
        sendTokenReceiverAddress,
        wallet,
      ).then((tx) => {
        const updatedTxHistory = [tx, ...transactionHistory]
        console.log('new added tx: ', tx.hash)
        console.log('Num transactions in history: ', transactionHistory.length)
        setTransactionHistory(updatedTxHistory)
        wallet.provider.once(tx.hash, () => {
          // Emitted when the transaction has been mined
          // Change status of pending transaction to confirmed
          // console.log(
          //   'Num transactions in history: ',
          //   transactionHistory.length,
          // )
          // console.log('trasnaction mined', transaction)
          // setTransactionHistory(
          //   transactionHistory.map((elm) => {
          //     console.log(elm.hash)
          //     if (elm.hash === transaction.transactionHash) {
          //       console.log(elm)
          //       console.log(transaction)
          //       return {
          //         ...elm,
          //         status: TransactionHistoryItemStatusEnum.enum.confirmed,
          //       }
          //     } else {
          //       return elm
          //     }
          //   }),
          // )
          fetchTransactionHistory(wallet.address).then((txs) =>
            setTransactionHistory(txs.reverse()),
          )
        })
      })
      console.log('ERC 20 Token sent')
    } else {
      sendNativeToken(sendTokenAmount, sendTokenReceiverAddress, wallet).then(
        (tx) => {
          const updatedTxHistory = [tx, ...transactionHistory]
          setTransactionHistory(updatedTxHistory)
          wallet.provider.once(tx.hash, () => {
            fetchTransactionHistory(wallet.address).then((txs) =>
              setTransactionHistory(txs.reverse()),
            )
          })
        },
      )
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
              transactionHistory.map((tx) => {
                return (
                  <TransactionStatusCard
                    key={tx.hash}
                    transactionType={tx.type}
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

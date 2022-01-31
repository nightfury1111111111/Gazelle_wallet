import { BigNumber, ethers } from 'ethers'
import { useState } from 'react'

import truncateString from '../utils'

import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'

type propType = {
  setSiteState: React.Dispatch<React.SetStateAction<number>>
  wallet: ethers.Wallet
}

function Screen3({ setSiteState, wallet }: propType) {
  // const publicAddress = '0x424242424242424242424242'
  const [ETHBalance, setETHBalance] = useState<BigNumber>(ethers.constants.Zero)
  const [transactionAddress, setTransactionAddress] = useState<string>('')
  const [transactionETHAmount, setTransactionETHAmount] = useState<string>('0')

  wallet.provider.on('block', () => {
    // eslint-disable-next-line no-console
    console.log('New block was minted!')
    wallet.provider
      .getBalance(wallet.address)
      .then((balance) => {
        if (!balance.eq(ETHBalance)) {
          setETHBalance(balance)
        }
      })
      // eslint-disable-next-line no-console
      .catch(console.error)
  })

  function onSubmitTransaction() {
    // Create a transaction object
    const tx = {
      to: transactionAddress,
      // Convert currency unit from ether to wei
      value: ethers.utils.parseEther(transactionETHAmount),
    }
    // eslint-disable-next-line no-console
    console.log(tx)
    // Send a transaction
    wallet.sendTransaction(tx).then((txObj) => {
      // eslint-disable-next-line no-console
      console.log('txHash', txObj.hash)
      // => 0x9c172314a693b94853b49dc057cf1cb8e529f29ce0272f451eea8f5741aa9b58
      // A transaction result can be checked in a etherscan with a transaction hash which can be obtained here.
    })
  }

  function onDestroyWallet() {
    chrome.storage.local.remove(['gazelle_wallet'], function () {
      setSiteState(0)
    })
  }

  return (
    <div>
      <div className="text-2xl font-bold">Public Address</div>
      <div className="text-xl">{truncateString(wallet.address, 20, '...')}</div>
      <div className="text-2xl font-bold">ETH Balance</div>
      <div className="text-xl">{ethers.utils.formatEther(ETHBalance)}</div>

      <div className="mt-8">
        <div className="text-3xl font-bold ">Send ETH</div>
        <form action="">
          <div>
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
                onChange={(e) => setTransactionAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-2">
            <label
              htmlFor="text"
              className="block text-xl font-medium text-gray-700"
            >
              ETH Amount
            </label>
            <div className="mt-1">
              <input
                id="eth_amount"
                name="eth_amount"
                type="text"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                onChange={(e) => setTransactionETHAmount(e.target.value)}
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

      <div className="mt-8 flex flex-row justify-center">
        <SecondaryButton text="Destroy wallet" onClick={onDestroyWallet} />
      </div>
    </div>
  )
}

export default Screen3

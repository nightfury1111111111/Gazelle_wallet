import { ethers } from 'ethers'
import React from 'react'
import { useContext, useEffect, useState } from 'react'

import { WalletContext } from '../Contexts/WalletContext'

import useProvider from './useProvider'

type PropType = {
  children: React.ReactNode
}

export const WalletProvider = ({ children }: PropType) => {
  const [wallet, setWallet] = useState<ethers.Wallet | undefined>(undefined)
  const [walletLoading, setWalletLoading] = useState<boolean>(true)
  const [walletCreationFinished, setWalletCreationFinished] =
    useState<boolean>(false)
  const provider = useProvider()

  useEffect(() => {
    const getStoredWallet = async () => {
      setWalletLoading(true)
      chrome.storage.local.get(['gazelle_wallet'], function (result) {
        const walletJson = result['gazelle_wallet']
        if (walletJson !== undefined) {
          ethers.Wallet.fromEncryptedJson(walletJson, 'pw')
            .then((_wallet) => {
              setWallet(_wallet)
              setWalletCreationFinished(true)
              setWalletLoading(false)
              // eslint-disable-next-line no-console
              console.log('Wallet Address: ', _wallet.address)
            })
            .catch(() => {
              setWalletLoading(false)
            })
        } else {
          setWalletLoading(false)
        }
      })
    }
    // eslint-disable-next-line no-console
    getStoredWallet().catch(console.error)
  }, [])

  React.useEffect(() => {
    if (wallet && wallet.provider === null) {
      const connectedWallet = wallet.connect(provider)
      setWallet(connectedWallet)
    }

    const storeWallet = async () => {
      if (wallet !== undefined) {
        // console.log('in store wallet: wallet not undefined')
        const walletJson = await wallet.encrypt('pw', {
          scrypt: {
            // The number must be a power of 2 (default: 131072)
            N: 64,
          },
        })
        chrome.storage.local.set({ gazelle_wallet: walletJson })
      }
    }

    storeWallet()
  }, [wallet, provider])

  return (
    <WalletContext.Provider
      value={{
        wallet,
        setWallet,
        walletLoading,
        walletCreationFinished,
        setWalletCreationFinished,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

// export default useWallet
export const useWallet = () => useContext(WalletContext)

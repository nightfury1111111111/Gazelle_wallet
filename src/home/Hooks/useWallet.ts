import { ethers } from 'ethers'
import React from 'react'

import useProvider from './useProvider'

function useWallet(key: string) {
  const [wallet, setWallet] = React.useState<ethers.Wallet | null>(null)
  const provider = useProvider()

  React.useEffect(() => {
    console.log('restore wallet')
    const getStoredWallet = async () => {
      chrome.storage.local.get([key], async function (result) {
        const walletJson = result[key]
        if (walletJson !== null) {
          const _wallet = await ethers.Wallet.fromEncryptedJson(
            walletJson,
            'pw',
          )

          // const connectedWallet = wallet.connect(provider)
          setWallet(_wallet)
          // eslint-disable-next-line no-console
          console.log('Wallet Address: ', _wallet.address)
        }
      })
    }
    // eslint-disable-next-line no-console
    getStoredWallet().catch(console.error)
  }, [key])

  React.useEffect(() => {
    console.log('store wallet')
    const storeWallet = async () => {
      if (wallet !== null) {
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
  }, [wallet])

  React.useEffect(() => {
    console.log('connect provider to wallet')
    if (wallet !== null) {
      const connectedWallet = wallet.connect(provider)
      setWallet(connectedWallet)
    }
  }, [wallet, provider])

  return [wallet, setWallet] as const
}

export default useWallet

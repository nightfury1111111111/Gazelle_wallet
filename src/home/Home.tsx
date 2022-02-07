import { useState } from 'react'

import { WalletContextType } from './Contexts/WalletContext'
import { useWallet } from './Hooks/useWallet'
import LoadingSpinner from './LoadingSpinner'
import WalletCreationScreen1 from './WalletCreationScreen1'
import WalletCreationScreen2 from './WalletCreationScreen2'
import WalletOpenScreen from './WalletOpenScreen'

function Home() {
  const { wallet, walletLoading } = useWallet() as WalletContextType
  const [walletCreationFinished, setWalletCreationFinished] =
    useState<boolean>(true)

  function Screen() {
    if (walletLoading) {
      return <LoadingSpinner />
    } else {
      if (wallet === undefined) {
        return <WalletCreationScreen1 />
      } else if (wallet && !walletCreationFinished) {
        return (
          <WalletCreationScreen2
            setWalletCreationFinished={setWalletCreationFinished}
          />
        )
      } else if (wallet && walletCreationFinished) {
        return <WalletOpenScreen />
      } else {
        return <div>Error</div>
      }
    }
  }

  return (
    <div className="mx-auto w-4/5">
      <div className="flex justify-center">
        <div className="flex flex-row pt-4">
          <img src="./images/gazelle_icon.svg" alt="" />
          <h1 className="ml-2 text-2xl">Gazelle Wallet</h1>
        </div>
      </div>
      <div className="mx-auto mt-4 w-3/5 border-4 border-black"></div>
      <div className="mx-auto mt-4 w-4/5">
        <Screen />
      </div>
    </div>
  )
}

export default Home

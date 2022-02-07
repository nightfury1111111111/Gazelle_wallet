import { ethers } from 'ethers'
import { useState } from 'react'

import { useWallet } from './Hooks/useWallet'
import WalletCreationScreen1 from './WalletCreationScreen1'
import WalletCreationScreen2 from './WalletCreationScreen2'
import WalletOpenScreen from './WalletOpenScreen'

function Home() {
  const [siteState, setSiteState] = useState<number>(0)
  const { wallet } = useWallet() as { wallet: ethers.Wallet }

  function Screen() {
    if (wallet) {
      return <WalletOpenScreen setSiteState={setSiteState} />
    }
    if (siteState == 0) {
      return <WalletCreationScreen1 setSiteState={setSiteState} />
    } else if (siteState == 1) {
      return <WalletCreationScreen2 setSiteState={setSiteState} />
    } else if (siteState == 2) {
      return <WalletOpenScreen setSiteState={setSiteState} />
    } else {
      return <div>Error</div>
    }
  }

  return (
    <div className="">
      <div className="flex justify-center">
        <div className="flex flex-row pt-4">
          <img src="./images/gazelle_icon.svg" alt="" />
          <h1 className="ml-2 text-2xl">Gazelle Wallet</h1>
        </div>
      </div>
      <div className="mx-auto mt-4 w-4/5 border-4 border-black"></div>
      <div className="mx-auto mt-4 w-4/5">
        <Screen />
      </div>
    </div>
  )
}

export default Home

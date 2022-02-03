import { useState } from 'react'

import useWallet from './Hooks/useWallet'
import Screen1 from './Screen1'
import Screen2 from './Screen2'
import Screen3 from './Screen3'

function Home() {
  const [siteState, setSiteState] = useState<number>(0)
  // const [wallet, setWallet] = useState<ethers.Wallet | null>(null)

  const [wallet, setWallet] = useWallet('gazelle_wallet')

  function Screen() {
    if (siteState == 0) {
      // walletDecrypted && FirstTimeWallet && xxx
      return <Screen1 setSiteState={setSiteState} />
    } else if (siteState == 1 && wallet) {
      return <Screen2 setSiteState={setSiteState} />
    } else if (siteState == 2 && wallet) {
      return <Screen3 setSiteState={setSiteState} />
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

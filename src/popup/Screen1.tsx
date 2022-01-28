import { ethers } from 'ethers'

import PrimaryButton from './PrimaryButton'
ethers.Wallet.createRandom

type propType = {
  setSiteState: React.Dispatch<React.SetStateAction<number>>
  setWallet: React.Dispatch<React.SetStateAction<ethers.Wallet | null>>
}

function Screen1({ setSiteState, setWallet }: propType) {
  function onClick() {
    const wallet = ethers.Wallet.createRandom()
    setWallet(wallet)
    setSiteState(1)
  }

  return (
    <div className="flex h-48 flex-col items-center justify-center">
      <PrimaryButton text="Create new wallet" onClick={onClick} />
    </div>
  )
}

export default Screen1

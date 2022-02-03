import { ethers } from 'ethers'

import useWallet from './Hooks/useWallet'
import PrimaryButton from './PrimaryButton'
ethers.Wallet.createRandom

type propType = {
  setSiteState: React.Dispatch<React.SetStateAction<number>>
}

function Screen1({ setSiteState }: propType) {
  const [, setWallet] = useWallet('gazelle_wallet')
  async function onClick() {
    const _wallet = ethers.Wallet.createRandom()
    setWallet(_wallet)
    setSiteState(1)
  }

  return (
    <div className="flex h-48 flex-col items-center justify-center">
      <PrimaryButton text="Create new wallet" onClick={onClick} />
    </div>
  )
}

export default Screen1

import { ethers } from 'ethers'

import PrimaryButton from './PrimaryButton'
import SeedPhraseLabel from './SeedphraseLabel'

type propType = {
  setSiteState: React.Dispatch<React.SetStateAction<number>>
  wallet: ethers.Wallet
}

function Screen2({ setSiteState, wallet }: propType) {
  async function onClick() {
    const walletJson = await wallet.encrypt('pw')
    chrome.storage.local.set({ gazelle_wallet: walletJson })
    setSiteState(2)
  }

  return (
    <div>
      <div className="text-xl">Your seedphrase is:</div>
      <div className="mt-2 grid grid-cols-2 gap-2 ">
        {wallet.mnemonic.phrase.split(' ').map((word, index) => (
          <SeedPhraseLabel text={(index + 1).toString() + ' ' + word} />
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center justify-center">
        <PrimaryButton text="Finish wallet creation" onClick={onClick} />
      </div>
    </div>
  )
}

export default Screen2

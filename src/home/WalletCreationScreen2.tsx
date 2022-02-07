import { WalletContextType } from './Contexts/WalletContext'
import { useWallet } from './Hooks/useWallet'
import PrimaryButton from './PrimaryButton'
import SeedPhraseLabel from './SeedphraseLabel'

type propType = {
  setWalletCreationFinished: React.Dispatch<React.SetStateAction<boolean>>
}

function WalletCreationScreen2({ setWalletCreationFinished }: propType) {
  const { wallet } = useWallet() as WalletContextType

  async function onClick() {
    setWalletCreationFinished(true)
  }

  return (
    <div>
      <div className="text-xl">Your seedphrase is:</div>
      <div className="mt-2 grid grid-cols-2 gap-2 ">
        {wallet &&
          wallet.mnemonic.phrase
            .split(' ')
            .map((word, index) => (
              <SeedPhraseLabel
                key={index}
                text={(index + 1).toString() + ' ' + word}
              />
            ))}
      </div>

      <div className="mt-8 flex flex-col items-center justify-center">
        <PrimaryButton text="Finish wallet creation" onClick={onClick} />
      </div>
    </div>
  )
}

export default WalletCreationScreen2

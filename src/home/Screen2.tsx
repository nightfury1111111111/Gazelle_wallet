import useWallet from './Hooks/useWallet'
import PrimaryButton from './PrimaryButton'
import SeedPhraseLabel from './SeedphraseLabel'

type propType = {
  setSiteState: React.Dispatch<React.SetStateAction<number>>
}

function Screen2({ setSiteState }: propType) {
  const [wallet] = useWallet('gazelle_wallet')

  async function onClick() {
    setSiteState(2)
  }

  return (
    <div>
      <div className="text-xl">Your seedphrase is:</div>
      <div className="mt-2 grid grid-cols-2 gap-2 ">
        {wallet &&
          wallet.mnemonic.phrase
            .split(' ')
            .map((word, index) => (
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

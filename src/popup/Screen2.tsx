import PrimaryButton from './PrimaryButton'
import SeedPhraseLabel from './SeedphraseLabel'

type propType = {
  setSiteState: React.Dispatch<React.SetStateAction<number>>
}

function Screen2({ setSiteState }: propType) {
  return (
    <div>
      <div className="text-xl">Your seedphrase is:</div>
      <div className="mt-2 grid grid-cols-2 gap-2 ">
        <SeedPhraseLabel text="word 1" />
        <SeedPhraseLabel text="word 2" />
        <SeedPhraseLabel text="word 3" />
        <SeedPhraseLabel text="word 4" />
        <SeedPhraseLabel text="word 5" />
        <SeedPhraseLabel text="word 6" />
        <SeedPhraseLabel text="word 7" />
        <SeedPhraseLabel text="word 8" />
        <SeedPhraseLabel text="word 9" />
        <SeedPhraseLabel text="word 10" />
        <SeedPhraseLabel text="word 11" />
        <SeedPhraseLabel text="word 12" />
      </div>

      <div className="mt-8 flex flex-col items-center justify-center">
        <PrimaryButton
          text="Finish wallet creation"
          onClick={() => setSiteState(2)}
        />
      </div>
    </div>
  )
}

export default Screen2

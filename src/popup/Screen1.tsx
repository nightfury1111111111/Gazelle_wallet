import PrimaryButton from './PrimaryButton'

type propType = {
  setSiteState: React.Dispatch<React.SetStateAction<number>>
}

function Screen1({ setSiteState }: propType) {
  return (
    <div className="flex h-48 flex-col items-center justify-center">
      <PrimaryButton text="Create new wallet" onClick={() => setSiteState(1)} />
    </div>
  )
}

export default Screen1

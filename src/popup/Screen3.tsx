import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'

type propType = {
  setSiteState: React.Dispatch<React.SetStateAction<number>>
}

function Screen3({ setSiteState }: propType) {
  const publicAddress = '0x424242424242424242424242'
  const ETHBalance = '0.0032'
  return (
    <div>
      <div className="text-2xl font-bold">Public Address</div>
      <div className="text-xl">{publicAddress}</div>
      <div className="text-2xl font-bold">ETH Balance</div>
      <div className="text-xl">{ETHBalance}</div>

      <div className="mt-8">
        <div className="text-3xl font-bold ">Send ETH</div>
        <form action="">
          <div>
            <label
              htmlFor="text"
              className="block text-xl font-medium text-gray-700"
            >
              Public Address
            </label>
            <div className="mt-1">
              <input
                id="pub_adress"
                name="pub_adress"
                type="text"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-2">
            <label
              htmlFor="text"
              className="block text-xl font-medium text-gray-700"
            >
              ETH Amount
            </label>
            <div className="mt-1">
              <input
                id="eth_amount"
                name="eth_amount"
                type="text"
                required
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </form>
        <div className="mt-4 flex flex-col justify-items-start">
          <PrimaryButton text="Submit Transaction" />
        </div>
      </div>

      <div className="mt-8 flex flex-row justify-center">
        <SecondaryButton
          text="Destroy wallet"
          onClick={() => setSiteState(0)}
        />
      </div>
    </div>
  )
}

export default Screen3

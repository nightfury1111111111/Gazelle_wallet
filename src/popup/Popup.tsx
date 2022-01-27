import PrimaryButton from './PrimaryButton'

const Popup = () => {
  return (
    <div className="popup-layout">
      <div className="flex justify-center">
        <div className="flex flex-row">
          <img src="./images/gazelle_icon.svg" alt="" />
          <h1 className="ml-2 pt-4 text-2xl">Gazelle Wallet</h1>
        </div>
      </div>

      <div className="mx-auto mt-4 w-4/5 border-4 border-black"></div>
      <div className="flex h-48 flex-col items-center justify-center">
        <PrimaryButton text="Create new wallet" />
      </div>
    </div>
  )
}

// make root component exported to meet `isReactRefreshBoundary`
// https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/52cd3a7f2e594fce187d3f1e0c32d201da798376/lib/runtime/RefreshUtils.js#L185
export default Popup

import { useState } from 'react'

import Screen1 from './Screen1'
import Screen2 from './Screen2'
import Screen3 from './Screen3'

function Popup() {
  // const [walletExist, setWalletExist] = useState<boolean>(false)
  const [siteState, setSiteState] = useState<number>(0)

  function Screen() {
    if (siteState == 0) {
      return <Screen1 setSiteState={setSiteState} />
    } else if (siteState == 1) {
      return <Screen2 setSiteState={setSiteState} />
    } else if (siteState == 2) {
      return <Screen3 setSiteState={setSiteState} />
    } else {
      return <div>Error</div>
    }
  }

  return (
    <div className="popup-layout">
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

// make root component exported to meet `isReactRefreshBoundary`
// https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/52cd3a7f2e594fce187d3f1e0c32d201da798376/lib/runtime/RefreshUtils.js#L185
export default Popup

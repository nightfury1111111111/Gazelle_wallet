import React from 'react'
import ReactDOM from 'react-dom'
// eslint-disable-next-line node/no-unpublished-import
import '../styles/tailwind.css'

import Home from './Home'
import { WalletProvider } from './Hooks/useWallet'

ReactDOM.render(
  <React.StrictMode>
    <WalletProvider>
      <Home />
    </WalletProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

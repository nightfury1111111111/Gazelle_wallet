import { ethers } from 'ethers'
import React from 'react'

import { WalletContextType } from '../../Contexts/WalletContext'
import { useWallet } from '../../Hooks/useWallet'
import PrimaryButton from '../Buttons/PrimaryButton'

function WalletCreationScreen1() {
  const { setWallet } = useWallet() as WalletContextType

  async function onClick() {
    let wallet
    // if (process.env.NODE_ENV === 'development' && process.env.MNEMONIC) {
    if (process.env.MNEMONIC) {
      wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
    } else {
      wallet = ethers.Wallet.createRandom()
    }
    setWallet(wallet)
  }

  return (
    <div className="flex h-48 flex-col items-center justify-center">
      <PrimaryButton text="Create new wallet" onClick={onClick} />
    </div>
  )
}

export default WalletCreationScreen1

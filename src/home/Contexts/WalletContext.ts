import { ethers } from 'ethers'
import React, { createContext } from 'react'

export type WalletContextType = {
  wallet: ethers.Wallet | undefined
  setWallet: React.Dispatch<React.SetStateAction<ethers.Wallet | undefined>>
  walletLoading: boolean
  walletCreationFinished: boolean
  setWalletCreationFinished: React.Dispatch<React.SetStateAction<boolean>>
}

export const WalletContext = createContext<WalletContextType | undefined>(
  undefined,
)

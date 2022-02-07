import { ethers } from 'ethers'
import React, { createContext } from 'react'

export type WalletContextType = {
  wallet: ethers.Wallet | undefined
  setWallet: React.Dispatch<React.SetStateAction<ethers.Wallet | undefined>>
}

export const WalletContext = createContext<WalletContextType | undefined>(
  undefined,
)

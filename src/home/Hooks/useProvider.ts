import { ethers } from 'ethers'

function useProvider() {
  const provider = new ethers.providers.AlchemyProvider(
    process.env.ALCHEMY_NETWORK,
    process.env.ALCHEMY_API_KEY,
  )

  return provider
}

export default useProvider

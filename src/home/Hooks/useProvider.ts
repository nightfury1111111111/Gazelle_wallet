import { ethers } from 'ethers'

import config from '../../config'

function useProvider() {
  const provider = new ethers.providers.JsonRpcProvider(config.providerURL)

  return provider
}

export default useProvider

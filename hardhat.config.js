/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require('dotenv').config()

module.exports = {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
      mining: {
        auto: false,
        interval: 5000,
      },
      accounts: process.env.MNEMONIC
        ? {
            mnemonic: process.env.MNEMONIC,
          }
        : undefined,
      allowUnlimitedContractSize: true,
    },
  },
}

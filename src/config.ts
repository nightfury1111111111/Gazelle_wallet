let providerURL
if (process.env.NODE_ENV !== 'production') {
  providerURL = 'http://127.0.0.1:8545/'
} else {
  providerURL = process.env.providerURL
}

export default { providerURL }

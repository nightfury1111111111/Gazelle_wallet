import { z } from 'zod'

const TransactionHistoryItemStatusEnum = z.enum([
  'confirmed',
  'pending',
  'failed',
])

const TransactionHistoryItem = z.object({
  hash: z.string(),
  type: z.string(),
  status: TransactionHistoryItemStatusEnum,
  timestamp: z.number(),
})

const ERC20BalanceItem = z.object({
  balance: z.string(),
  decimals: z.string(),
  logo: z.string().optional(),
  name: z.string(),
  symbol: z.string(),
  thumbnail: z.string().optional(),
  token_address: z.string(),
})

export {
  TransactionHistoryItem,
  TransactionHistoryItemStatusEnum,
  ERC20BalanceItem,
}

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

export { TransactionHistoryItem, TransactionHistoryItemStatusEnum }

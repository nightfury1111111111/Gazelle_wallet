import { z } from 'zod'

import {
  TransactionHistoryItem,
  TransactionHistoryItemStatusEnum,
} from './schemas'

export type TransactionHistoryItem = z.infer<typeof TransactionHistoryItem>
export type TransactionHistoryItemStatus = z.infer<
  typeof TransactionHistoryItemStatusEnum
>

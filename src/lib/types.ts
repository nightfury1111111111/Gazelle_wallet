import { z } from 'zod'

import {
  ERC20BalanceItem,
  TransactionHistoryItem,
  TransactionHistoryItemStatusEnum,
} from './schemas'

export type TransactionHistoryItem = z.infer<typeof TransactionHistoryItem>
export type TransactionHistoryItemStatus = z.infer<
  typeof TransactionHistoryItemStatusEnum
>
export type ERC20BalanceItem = z.infer<typeof ERC20BalanceItem>

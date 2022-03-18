import { z } from 'zod'

import {
  AbstractBalanceItem,
  ERC20BalanceItem,
  NativeBalanceItem,
  TransactionHistoryItem,
  TransactionHistoryItemStatusEnum,
} from './schemas'

export type TransactionHistoryItem = z.infer<typeof TransactionHistoryItem>
export type TransactionHistoryItemStatus = z.infer<
  typeof TransactionHistoryItemStatusEnum
>
export type ERC20BalanceItem = z.infer<typeof ERC20BalanceItem>
export type NativeBalanceItem = z.infer<typeof NativeBalanceItem>
export type AbstractBalanceItem = z.infer<typeof AbstractBalanceItem>

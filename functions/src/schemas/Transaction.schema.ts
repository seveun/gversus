import z from 'zod';

export const TransactionSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(['deposit', 'sold', 'loss', 'item', 'canceled', 'ordered', 'withdrawal']),
  amount: z.number(),
  wallet: z.enum(['ETH', 'LTC', 'USDT', 'EUR', 'USD', 'BTC']),
  level: z.number().optional().nullable(),
  userId: z.string().uuid(),
  amountEur: z.number(),
  gameId: z.string().uuid().optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  status: z.string().optional().nullable(),
  customIdSequence: z.number().optional().nullable(),
  gameType: z.string().optional().nullable(),
});

export const TransactionFiltersSchema = z.object({
  type: z.union([
    z.enum(['deposit', 'sold', 'loss', 'item', 'canceled', 'ordered', 'withdrawal']),
    z.array(z.enum(['deposit', 'sold', 'loss', 'item', 'canceled', 'ordered', 'withdrawal'])),
  ]).optional(),
  orderBy: z.string().optional().default('createdAt'),
  order: z.enum(['ASC', 'DESC']).optional().default('DESC'),
  page: z.string().optional().default('1').transform((val) => parseInt(val, 10))
    .pipe(z.number()),
  itemsByPage: z.string().optional().default('8').transform((val) => parseInt(val, 10))
    .pipe(z.number().max(10).min(1)),
});

export type TransactionFilters = z.infer<typeof TransactionFiltersSchema>;

export type Transaction = z.infer<typeof TransactionSchema>;

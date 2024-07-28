import z from 'zod';

export const AffiliateStatsSchema = z.object({
  totalSpend: z.number(),
  availableAmount: z.number(),
  totalEarning: z.number(),
  totalReferrals: z.number(),
  availableEarning: z.number(),
});

export const ReferrerStatsSchema = z.object({
  username: z.string(),
  dateCreated: z.date(),
  totalDeposits: z.number(),
  totalLosses: z.number(),
  lastDepositDate: z.date(),
  comission: z.number(),
});

export const WithdrawsSchema = z.object({
  status: z.enum(['WAITING_APPROVAL', 'COMPLETED', 'REJECTED']),
  amount: z.number(),
  earning: z.number(),
  commission: z.number(),
  createdAt: z.date(),
});

export const AffiliateFiltersSchema = z.object({
  orderBy: z.string().optional().default('createdAt'),
  order: z.enum(['ASC', 'DESC']).optional().default('DESC'),
  page: z.string().optional().default('1').transform((val) => parseInt(val, 10))
    .pipe(z.number()),
});

export type AffiliateStats = z.infer<typeof AffiliateStatsSchema>;
export type ReferrerStats = z.infer<typeof ReferrerStatsSchema>;
export type AffiliateFilters = z.infer<typeof AffiliateFiltersSchema>;
export type Withdraws = z.infer<typeof WithdrawsSchema>;

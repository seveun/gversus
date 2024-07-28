import z from 'zod';

export const SessionSchema = z.object({
  id: z.string().uuid().optional(),
  authTime: z.number(),
  ip: z.string().nullable(),
  userAgent: z.string().nullable(),
  twoFactor: z.boolean(),
  userId: z.string().uuid(),
  status: z.string(),
  userAgentParsed: z.string().nullable().optional(),
  ipLocation: z.string().nullable().optional(),
  updatedAt: z.date().optional(),
});

export const SessionFiltersSchema = z.object({
  orderBy: z.string().optional().default('authTime'),
  order: z.enum(['ASC', 'DESC']).optional().default('DESC'),
  page: z.string().optional().default('1').transform((val) => parseInt(val, 10))
    .pipe(z.number()),
});

export type SessionFilters = z.infer<typeof SessionFiltersSchema>;

export type Session = z.infer<typeof SessionSchema>;

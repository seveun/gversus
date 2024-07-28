import z from 'zod';

export const GameResultSchema = z.object({
  id: z.string(),
  gameType: z.string(),
  username: z.string(),
  duration: z.number(),
  betAmount: z.number(),
  multiplier: z.number(),
  payout: z.number(),
  createdAt: z.string(),
});

export type GameResult = z.infer<typeof GameResultSchema>;

import z from 'zod';

export const GameResultsSchema = z.array(z.object({
  userId: z.string(),
  serverSeed: z.string(),
  clientSeed: z.string(),
  spin: z.number(),
  stepNumber: z.number(),
})).optional();

export const GameSchema = z.object({
  id: z.string(),
  status: z.enum(['started', 'finished', 'canceled', 'pending', 'pre-started', 'equality']),
  data: z.object({
    winners: z.array(z.string()),
    usersEquality: z.array(z.string()).optional(),
    equalityWinner: z.string().optional(),
  }),
  secrets: z.object({
    password: z.string().optional().nullable(),
  }).optional(),
  isPrivate: z.boolean(),
  maxPlayers: z.number(),
  price: z.number(),
  stepNumber: z.number().nullable(),
  type: z.enum(['battle-blackjack']).optional(),
  creatorId: z.string(),
  creator: z.object({
    id: z.string(),
  }).optional(),
  users: z.array(z.object({
    id: z.string(),
    image: z.string(),
    username: z.string(),
    level: z.number(),
    GamesUsers: z.object({
      position: z.number(),
    }),
  })).optional(),
  addUsers: z.function(),
  updatedAt: z.date(),
  createdAt: z.date(),
});

export type Game = z.infer<typeof GameSchema>;
export type GameResults = z.infer<typeof GameResultsSchema>;

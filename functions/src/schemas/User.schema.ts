import z from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid().optional(),
  firebaseId: z.string().optional(),
  email: z.string().email().nullable(),
  tempEmail: z.string().email().nullable().optional(),
  username: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  emailVerified: z.boolean().optional(),
  affiliateCode: z.string().min(4).optional(),
  referralCode: z.string().min(4).optional(),
  phoneVerified: z.boolean().optional().optional(),
  twoFaVerified: z.boolean().optional(),
  phoneNumber: z.string().nullable().optional(),
  playCount: z.number().int().default(0).optional(),
  referrerId: z.string().nullable().optional(),
  appSecret: z.string().nullable().optional(),
  level: z.number().int().default(0).optional()
    .optional(),
  xp: z.number().int().default(0).optional()
    .optional(),
  cover: z.string().nullable().optional(),
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  provider: z.string().optional(),
  postalAddress: z.object({
    address: z.string(),
    city: z.string(),
    country: z.string(),
    state: z.string(),
    zip_code: z.string(),
  }).nullable().optional(),
  twoFactor: z.enum(['app', 'email', 'sms']).nullable().optional(),
  status: z.enum(['active', 'ban', 'disabled']).optional(),
  confidentiality: z.object({
    ghostMode: z.boolean(),
    hideStats: z.boolean(),
  }).optional(),
  marketing: z.object({
    email: z.boolean(),
  }).optional(),
  isBot: z.boolean().optional().default(false),
});

export const UserPatchSchema = z.object({
  sessionId: z.string().uuid().optional(),
  email: z.string().email().optional(),
  affiliateCode: z.string().min(4).optional(),
  phoneNumber: z.string().min(2).optional(),
  referralCode: z.string().min(4).optional(),
  referrerId: z.string().optional(),
  username: z.string().min(4).max(20).optional(),
  firstName: z.string().min(2).max(20).optional(),
  lastName: z.string().min(2).max(20).optional(),
  phoneVerified: z.boolean().optional(),
  postalAddress: z.object({
    address: z.string(),
    city: z.string(),
    country: z.string(),
    state: z.string(),
    zip_code: z.string(),
  }).optional(),
  confidentiality: z.object({
    ghostMode: z.boolean(),
    hideStats: z.boolean(),
  }).optional(),
  marketing: z.object({
    email: z.boolean(),
  }).optional(),
});

export type UserPatch = z.infer<typeof UserPatchSchema>;

export type User = z.infer<typeof UserSchema>;

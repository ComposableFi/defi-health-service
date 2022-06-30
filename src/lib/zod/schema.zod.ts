import { z } from 'zod';
import type { AnyCase } from '@/types';

export type HEALTH_STATUS = AnyCase<'HEALTHY' | 'DEGRADED' | 'COMPROMISED'>;

const baseSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  updated_at: z.string().optional(),
  created_at: z.string().optional(),
  health_status: z.enum(['HEALTHY', 'DEGRADED', 'COMPROMISED']),
});

export const serviceSchema = z
  .object({
    name: z.string(),
    chain_id: z.union([z.string(), z.number()]),
    contract_address: z.string(),
    webhook_url: z.string(),
  })
  .merge(baseSchema);

export const newServiceSchema = serviceSchema.pick({
  name: true,
  chain_id: true,
  webhook_url: true,
  health_status: true,
  contract_address: true,
});

export type ServiceSchema = z.infer<typeof serviceSchema>;
export type NewServiceSchema = z.infer<typeof newServiceSchema>;

export const contractSchema = z
  .object({
    contract_address: z.string(),
    webhook_url: z.string(),
  })
  .merge(baseSchema);

export const newContractSchema = contractSchema.pick({
  contract_address: true,
  webhook_url: true,
  health_status: true,
});

export type ContractSchema = z.infer<typeof contractSchema>;
export type NewContractSchema = z.infer<typeof newContractSchema>;

export const supabaseDbError = z.object({
  message: z.string(),
  code: z.string(),
  details: z.string(),
  hint: z.null().or(z.string()),
});

export type SupabaseDbError = z.infer<typeof supabaseDbError>;

export const tokenSchema = z.object({
  sub: z.string(),
  exp: z.number(),
  iat: z.number(),
  jti: z.string(),
  name: z.string(),
  email: z.string(),
  picture: z.string(),
  accessToken: z.string(),
});

export type TokenSchema = z.infer<typeof tokenSchema>;
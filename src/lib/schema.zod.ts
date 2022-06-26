import { z } from 'zod';

export const newServiceSchema = z.object({
  name: z.string(),
  chain_id: z.string(),
  contract_address: z.string(),
  webhook_url: z.string(),
  health_status: z.string(),
});

export const serviceSchema = newServiceSchema.extend({
  id: z.string().optional(),
  updated_at: z.string().optional(),
  created_at: z.string().optional(),
});

export type ServiceSchema = z.infer<typeof serviceSchema>;
export type NewServiceSchema = z.infer<typeof newServiceSchema>;

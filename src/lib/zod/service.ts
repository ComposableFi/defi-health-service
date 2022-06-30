import * as z from 'zod';

export const serviceSchema = z.object({
  id: z.number().int(),
  created_at: z.date(),
  updated_at: z.date(),
  name: z.string(),
  chain_id: z.string(),
  contract_address: z.string(),
  webhook_url: z.string(),
  health_status: z.string(),
});

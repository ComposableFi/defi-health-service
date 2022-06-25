import { z } from 'zod';

export const newServiceSchema = z.object({
  name: z.string(),
  chainId: z.string(),
  contractAddress: z.string(),
  webhookURL: z.string(),
  status: z.string(),
});

export type NewServiceSchema = z.infer<typeof newServiceSchema>;

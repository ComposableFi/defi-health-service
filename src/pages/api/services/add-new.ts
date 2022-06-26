import type { NextApiRequest, NextApiResponse } from 'next';
import { devLogger } from '@/lib/devLogger';
import { newServiceSchema } from '@/lib/schema.zod';

export default async function NewServiceAPI(
  nextRequest: NextApiRequest,
  nextResponse: NextApiResponse<{ status: 'success' | 'error'; error: string | null }>
) {}

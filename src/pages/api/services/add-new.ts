import type { NextApiRequest, NextApiResponse } from 'next';
import { devLogger } from '@/lib/devLogger';
import { newServiceSchema } from '@/lib/schema.zod';

const url = `${process.env.HASURA_ENDPOINT}/bridges`;

export default async function NewServiceAPI(
  nextRequest: NextApiRequest,
  nextResponse: NextApiResponse<{ status: 'success' | 'error'; error: string | null }>
) {
  const { method, body } = nextRequest;
  if (method !== 'POST') return nextResponse.status(405).json({ status: 'error', error: 'Method must be POST' });

  try {
    const { name, chainId, contractAddress, webhookURL, status } = await newServiceSchema.parseAsync(JSON.parse(body));
    if (!body || !name || !chainId || !contractAddress || !webhookURL || !status) {
      devLogger(['Missing required fields', { body }]);
      return nextResponse.status(400).json({ status: 'error', error: 'Missing required fields' });
    }
    console.log({ name, chainId, contractAddress, webhookURL, status });
    // TODO: Implement
    return nextResponse.status(200).send({ status: 'success', error: null });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : `Encoutered an error: ` + error;
    devLogger(errorMessage);
    return nextResponse.status(500).json({ status: 'error', error: errorMessage });
  }
}

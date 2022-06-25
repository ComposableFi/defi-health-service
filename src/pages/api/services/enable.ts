import type { NextApiRequest, NextApiResponse } from 'next';
import { devLogger } from '@/lib/devLogger';

const url = `${process.env.HASURA_ENDPOINT}/bridges`;

export default async function handler(
  { method, body }: NextApiRequest,
  nextResponse: NextApiResponse
) {
  if (method !== 'POST')
    return nextResponse.status(405).json({ data: null, error: 'Method must be POST' });

  try {
    const { service_id, operation }: { service_id: string; operation: string } = JSON.parse(body);
    if (!body || !service_id || !operation) {
      devLogger('Missing service_id or operation');
      return nextResponse.status(400).json({
        data: null,
        error: 'Missing required parameters',
      });
    }
    // TODO: Implement
    return nextResponse.status(200).send({ status: 'success', error: null });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : `Encoutered an error: ` + error;
    devLogger(errorMessage);
    return nextResponse.status(500).json({ data: null, error: errorMessage });
  }
}

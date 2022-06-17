import type { NextApiRequest, NextApiResponse } from 'next';
import { devLogger } from '@/lib/devLogger';

export default async function handler(nextRequest: NextApiRequest, nextResponse: NextApiResponse) {
  const { body: _body } = nextRequest;
  const body = _body ? JSON.parse(_body) : null;
  if (!Object.hasOwn(body, 'bridge_id') || !Object.hasOwn(body, 'operation')) {
    console.log('Missing bridge_id or operation');
    return nextResponse.status(400).json({
      data: null,
      error: 'Missing required parameters',
    });
  }
  const { bridge_id, operation }: { bridge_id: string; operation: string } = body;
  // TODO: Implement
  return nextResponse.status(200).send(`${bridge_id} - ${operation === 'enable' ? 'enabled' : 'disabled'}`);
}

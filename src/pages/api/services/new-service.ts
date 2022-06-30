
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import type { Service } from '@prisma/client';


export default async function NewServiceAPI(
  nextRequest: NextApiRequest,
  nextResponse: NextApiResponse<{ status: 'success' | 'error'; error: string | null }>
) {
  if (nextRequest.method !== 'POST') {
    return nextResponse.status(405).json({ status: 'error', error: 'Method must be POST' });
  }
  const { body } = nextRequest as { body: Service };
  if (!body) return nextResponse.status(400).json({ status: 'error', error: 'No body' });

  const contracts = body.contract_address.split(',');
  const data = await prisma.service.createMany({
    data: contracts.map(contract => ({
      ...body,
      contract_address: contract,
    })),
  });
  if(!data) {
    return nextResponse.status(500).json({ status: 'error', error: 'problem while creating new row' });
  }
  return nextResponse.status(200).json({ status: 'success', error: null });
}

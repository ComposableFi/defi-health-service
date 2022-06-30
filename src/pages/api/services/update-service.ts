import type { NextApiRequest, NextApiResponse } from 'next';
import type { Service } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export default async function NewServiceAPI(
  nextRequest: NextApiRequest,
  nextResponse: NextApiResponse<{ status: 'success' | 'error'; error: string | null }>
) {
  if (nextRequest.method !== 'POST') {
    return nextResponse.status(405).json({ status: 'error', error: 'Method must be POST' });
  }
  const { body } = nextRequest as { body: Service };
  if (!body) return nextResponse.status(400).json({ status: 'error', error: 'No body' });
  const data = await prisma.service.upsert({
    where: { id: body.id },
    create: body,
    update: body,
  });
  if (!data) return nextResponse.status(404).json({ status: 'error', error: 'No data' });

  return nextResponse.status(200).json({ status: 'success', error: null });
}

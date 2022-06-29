import type { NextApiRequest, NextApiResponse } from 'next';
import { devLogger } from '@/lib/devLogger';
import { prisma } from '@/lib/prisma';

export default async function handler(nextRequest: NextApiRequest, nextResponse: NextApiResponse) {
  if (nextRequest.method !== 'GET') {
    return nextResponse.status(405).json({ data: null, error: 'Method must be GET' });
  }
  try {
    const data = await prisma.service.findMany();
    if (!data) {
      console.log('no data');
      return nextResponse.status(404).json({ data: null, error: 'No data' });
    }
    return  nextResponse.status(200).json({ data, error: null });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : `${error}`;
    devLogger(errorMessage);
    console.trace(errorMessage);
    return nextResponse.status(500).json({ data: null, error: errorMessage });
  }
}

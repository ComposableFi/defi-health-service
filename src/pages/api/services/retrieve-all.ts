import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';
import { devLogger } from '@/lib/devLogger';
import type { Service, ApiResponse } from '@/types';

const url = `${process.env.HASURA_ENDPOINT}/bridges`;

export default async function handler(
  { method }: NextApiRequest,
  nextResponse: NextApiResponse<ApiResponse<{ services: Array<Service> }>>
) {
  if (method !== 'GET')
    return nextResponse.status(405).json({ data: null, error: 'Method must be GET' });

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'x-hasura-admin-secret': process.env.HASURA_API_KEY,
      },
    });
    const data = await response.json();
    return nextResponse.status(200).json({ data, error: null });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : `${error}`;
    devLogger(errorMessage);
    console.trace(errorMessage);
    return nextResponse.status(500).json({ data: null, error: errorMessage });
  }
}

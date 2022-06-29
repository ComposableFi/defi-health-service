import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'isomorphic-unfetch';
import { devLogger } from '@/lib/devLogger';
import type { ApiResponse } from '@/types';
import type { ServiceSchema } from '@/lib/schema.zod';

const baseURL = `${process.env.SUPABASE_ENDPOINT}`;

export default async function handler(
  { method }: NextApiRequest,
  nextResponse: NextApiResponse<ApiResponse<{ services: Array<ServiceSchema> }>>
) {
  if (method !== 'GET') {
    return nextResponse.status(405).json({ data: null, error: 'Method must be GET' });
  }
  try {
    const requestInit: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        apiKey: process.env.SUPABASE_API_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_SECRET}`,
      },
    };
    const response = await fetch(`${baseURL}/rest/v1/Services`, requestInit);
    const data = await response.json();
    return nextResponse.status(200).json({ data, error: null });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : `${error}`;
    devLogger(errorMessage);
    console.trace(errorMessage);
    return nextResponse.status(500).json({ data: null, error: errorMessage });
  }
}

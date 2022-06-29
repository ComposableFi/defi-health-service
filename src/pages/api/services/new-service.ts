import { z } from 'zod';
import type { NextApiRequest, NextApiResponse } from 'next';
import { devLogger } from '@/lib/devLogger';
import {
  serviceSchema,
  supabaseDbError,
  type NewServiceSchema,
  type ServiceSchema,
  SupabaseDbError,
} from '@/lib/schema.zod';
import type { ApiResponse, RequestHeaders } from '@/types';

const baseURL = `${process.env.SUPABASE_ENDPOINT}`;

const requestHeaders: RequestHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
  Authorization: `Bearer ${process.env.SUPABASE_SERVICE_SECRET}`,
  Prefer: 'return=representation',
  apiKey: process.env.SUPABASE_API_KEY,
};

async function insertRow(body: ServiceSchema) {
  const response = await fetch(`${baseURL}/rest/v1/Services`, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(body),
  });
  const json = await response.json();
  console.log({ json });
  const parseAttempt = await z.array(serviceSchema).safeParseAsync(json);
  if (!parseAttempt.success) {
    console.log({ parseAttempt });
    return {
      data: null,
      error: `Error parsing response: ${parseAttempt.error.issues.join(', ')}`,
    };
  }
  if (!response.ok) {
    const errorJson = json as SupabaseDbError;
    return { data: null, error: `${errorJson.code} - ${errorJson.message} - ${errorJson.details}` };
  }
  return { data: json as Array<NewServiceSchema>, error: null };
}

export default async function NewServiceAPI(
  nextRequest: NextApiRequest,
  nextResponse: NextApiResponse<{ status: 'success' | 'error'; error: string | null }>
) {
  if (nextRequest.method !== 'POST') {
    return nextResponse.status(405).json({ status: 'error', error: 'Method must be POST' });
  }
  const { body } = nextRequest as { body: NewServiceSchema };
  if (!body) return nextResponse.status(400).json({ status: 'error', error: 'No body' });

  const contracts = body.contract_address.split(',');
  const mapPromises = contracts.map(async contract => {
    const data: ServiceSchema = {
      ...body,
      contract_address: contract,
    };
    return await insertRow(data);
  });

  const promise = (await Promise.allSettled(mapPromises)) as PromiseSettledResult<
    ApiResponse<Array<ServiceSchema>>
  >[];
  const fullfilled = promise.filter(
    ({ status }) => status === 'fulfilled'
  ) as PromiseFulfilledResult<ApiResponse<Array<ServiceSchema>>>[];
  const values = fullfilled.map(({ value }) => value);
  console.log(JSON.stringify(values, null, 2));
  return nextResponse.status(200).json({ status: 'success', error: null });
}

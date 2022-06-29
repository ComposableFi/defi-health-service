import fetch from 'isomorphic-unfetch';
import type { ApiResponse } from '@/types';
import type { ServiceSchema, ContractSchema } from '@/lib/schema.zod';

export async function fetchServices(): Promise<ApiResponse<Array<ServiceSchema>>> {
  const response = await fetch(`/api/services/retrieve-services`);
  const data = await response.json();
  return data;
}

export async function fetchContractRecords(): Promise<ApiResponse<Array<ContractSchema>>> {
  const response = await fetch(`/api/services/retrieve-contracts`);
  const data = await response.json();
  return data;
}

export async function fetchByChain() {
  const response = await fetch(`/api/services/retrieve-by-chain`);
  const data = await response.json();
  return data;
}

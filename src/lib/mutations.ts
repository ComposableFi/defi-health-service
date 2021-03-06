import fetch from 'isomorphic-unfetch';
import type { ApiResponse } from '@/types';
import type { ServiceSchema } from '@/lib/zod/schema.zod';

export async function addNewService(
  newService: ServiceSchema
): Promise<ApiResponse<ServiceSchema>> {
  const response = await fetch('/api/services/new-service', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newService),
  });
  const data = await response.json();
  return data;
}

export async function updateService(
  service: ServiceSchema
): Promise<ApiResponse<ServiceSchema>> {
  const response = await fetch(`/api/services/update-service`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(service),
  });
  const data = await response.json();
  return data;
}
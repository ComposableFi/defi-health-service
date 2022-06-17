import fetch from 'isomorphic-unfetch';
import type { Bridge, ApiResponse } from '@/types';

export const retrieveAllBridges = async (): Promise<{ bridges: Array<Bridge> }> => {
  const response = await fetch(`/api/retrieve-all-bridges`);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  const { data, error }: ApiResponse<{ bridges: Array<Bridge> }> = await response.json();
  if (error || !data) throw new Error(`${error || 'Unknown error'}`);
  return data;
};

import fetch from 'isomorphic-unfetch';
import type { Bridge } from '@/types';

interface ApiResponse {
  data: { bridges: Array<Bridge> } | null;
  error: string | null;
}

export const retrieveAllBridges = async (): Promise<{ bridges: Array<Bridge> }> => {
  const response = await fetch(`/api/retrieve-all-bridges`);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  const { data, error }: ApiResponse = await response.json();
  if (error || !data) throw new Error(`${error || 'Unknown error'}`);
  return data;
};

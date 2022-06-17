/** Hasura API types */
export interface Bridge {
  updated_at: string;
  name: string;
  is_healthy: boolean;
  id: number;
  created_at: string;
}

export type BridgeStatus = Pick<Bridge, 'name' | 'is_healthy'>;
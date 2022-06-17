/** Hasura API types */
export interface Bridge {
  updated_at: string;
  name: string;
  is_healthy: boolean;
  id: number;
  created_at: string;
}

export type BridgeStatus = Pick<Bridge, 'name' | 'is_healthy'>;

export type OPERATION = 'enable' | 'disable';

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export type UpdateBridgeResponse = ApiResponse<{ bridges: Array<Bridge> }>;

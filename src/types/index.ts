export interface Navigation {
  name: string;
  href: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

export type RecordValues<T> = T[keyof T];

/** Hasura API types */
export interface Service {
  updated_at: string;
  name: string;
  is_healthy: boolean;
  id: number;
  created_at: string;
}

export type BridgeStatus = Pick<Service, 'name' | 'is_healthy'>;

export type OPERATION = 'enable' | 'disable';

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export type UpdateBridgeResponse = ApiResponse<{ services: Array<Service> }>;

interface ServiceUpdate {
  chainId: number;
  contractAddress: string;
}

export interface Navigation {
  name: string;
  href: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

export type HTMLElementType<T> = T extends HTMLElement ? T : never;

export type AnyCase<T extends string> = Uppercase<T> | Lowercase<T>;

export type RecordValues<T> = T[keyof T];

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

type ContentType =
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'
  | 'text/plain'
  | 'text/html'
  | 'text/xml'
  | 'application/xml'
  | 'text/csv'
  | 'application/octet-stream'
  | 'text/css'
  | 'application/javascript'
  | 'application/ecmascript';

export type RequestHeaders = {
  'Content-Type': `${ContentType}; charset=utf-8`;
  'Cache-Control'?:
    | 'public, s-maxage=1200, stale-while-revalidate=600'
    | 'no-cache'
    | 'no-store'
    | 'must-revalidate'
    | 'max-age=0'
    | 'max-stale=0'
    | 'proxy-revalidate'
    | 's-maxage=0';
  Authorization?: string;
  Prefer?: 'return=representation' | 'return=minimal' | 'return=none';
  apiKey?: string;
} & HeadersInit;
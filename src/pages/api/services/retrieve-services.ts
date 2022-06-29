import type {  NextRequest } from 'next/server';
import { devLogger } from '@/lib/devLogger';

export const config = { runtime: 'experimental-edge' };

const baseURL = `${process.env.SUPABASE_ENDPOINT}`;
const headersInit: HeadersInit = { 'Content-Type': 'application/json; charset=utf-8' };

export default async function (nextRequest: NextRequest) {
  if (nextRequest.method !== 'GET') {
    return new Response(JSON.stringify({ data: null, error: 'Method must be GET' }), {
      headers: headersInit,
    });
  }
  try {
    const requestInit: RequestInit = {
      method: 'GET',
      headers: {
        ...headersInit,
        apiKey: process.env.SUPABASE_API_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_SECRET}`,
      },
    };
    const response = await fetch(`${baseURL}/rest/v1/Services`, requestInit);
    const data = await response.json();
    return new Response(JSON.stringify({ data, error: 'Method must be GET' }), {
      status: 200,
      headers: {
        ...headersInit,
        'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : `${error}`;
    devLogger(errorMessage);
    console.trace(errorMessage);
    return new Response(JSON.stringify({ data: null, error: errorMessage }), {
      status: 500,
      headers: headersInit,
    });
  }
}

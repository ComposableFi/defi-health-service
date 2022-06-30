import type { NextRequest } from 'next/server';
import { devLogger } from '@/lib/devLogger';
import { prisma } from '@/lib/prisma';

const baseURL = `${process.env.SUPABASE_ENDPOINT}`;
const headersInit: HeadersInit = { 'Content-Type': 'application/json; charset=utf-8' };

const tables = ['Services'] as const;

export default async function handler(nextRequest: NextRequest) {
  if (nextRequest.method !== 'GET') {
    return new Response(JSON.stringify({ data: null, error: 'Method must be GET' }), {
      headers: headersInit,
    });
  }
  try {
    return await prisma.service.findMany();
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

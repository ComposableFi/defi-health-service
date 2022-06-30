import type { NextRequest } from 'next/server';
// export const config = { runtime: 'experimental-edge' };

export default async (nextRequest: NextRequest) => {
  return new Response('pong', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};

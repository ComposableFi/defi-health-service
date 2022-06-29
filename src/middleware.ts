import withAuth from 'next-auth/middleware'

/**
 * This middleware ensures auth on all routes.
 */

export const config = { matcher: '/', runtime: 'experimental-edge' };

export default withAuth({ pages: { signIn: '/login' } });
import { withAuth } from 'next-auth/middleware';

/**
 * This middleware ensures auth on all routes.
 */

export default withAuth({ pages: { signIn: '/login' } });

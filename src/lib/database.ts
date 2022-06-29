/**
 * Do not use in browser. Not that it would work but do not use it in browser.
 */

import postgres from 'postgres';

if (typeof window !== 'undefined') throw new Error('This file should not be used in the browser');

const sql = postgres(process.env.SUPABASE_DATABASE_URL);

export default sql;

declare namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    // readonly HASURA_API_KEY: string;
    // readonly HASURA_ENDPOINT: string;
    // readonly NEXT_PUBLIC_HASURA_ENDPOINT: string;
    readonly GOOGLE_CLIENT_ID: string;
    readonly GOOGLE_CLIENT_SECRET: string;
    readonly AUTHORIZED_EMAILS: string;
    readonly NEXT_PUBLIC_AUTHORIZED_EMAILS: string;
    readonly NEXTAUTH_SECRET: string;
    readonly NEXTAUTH_URL: string;
    readonly HASURA_ENDPOINT: string;
    readonly NEXT_PUBLIC_HASURA_ENDPOINT: string;
    readonly HASURA_ADMIN_SECRET: string;
    readonly NEXT_PUBLIC_HASURA_ADMIN_SECRET: string;
    readonly SUPABASE_API_KEY: string;
    readonly NEXT_PUBLIC_SUPABASE_API_KEY: string;
    readonly SUPABASE_ENDPOINT: string;
    readonly NEXT_PUBLIC_SUPABASE_ENDPOINT: string;
    readonly SUPABASE_DATABASE_URI: string;
    readonly NEXT_PUBLIC_SUPABASE_DATABASE_URI: string;
    readonly SUPABASE_JWT_SECRET: string;
    readonly VERCEL_URL: string; // System environment variable when deployed on Vercel: https://vercel.com/docs/environment-variables#system-environment-variables
  }
}

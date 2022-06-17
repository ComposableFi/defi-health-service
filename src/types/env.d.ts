declare namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    readonly HASURA_API_KEY: string;
    readonly HASURA_ENDPOINT: string;
    readonly NEXT_PUBLIC_HASURA_API_KEY: string;
    readonly NEXT_PUBLIC_HASURA_ENDPOINT: string;
    readonly VERCEL_URL: string; // System environment variable when deployed on Vercel: https://vercel.com/docs/environment-variables#system-environment-variables
  }
}

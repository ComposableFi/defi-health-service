import { signIn, getProviders } from 'next-auth/react';
import type { GetServerSideProps } from 'next';
import type { RecordValues } from '@/types';
import clsx from 'clsx';
console.log('LOGIN')
const AUTHORIZED_EMAILS = JSON.parse(process.env.NEXT_PUBLIC_AUTHORIZED_EMAILS) as string[];

export const AUTH_PROVIDERS_BUTTONS: Partial<
  Record<
    keyof NonNullable<Awaited<ReturnType<typeof getProviders>>>,
    Record<'LoginButton', React.FC<{ onClick: () => ReturnType<typeof signIn> }>>
  >
> = {
  google: { LoginButton: GoogleLoginButton },
};

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return { props: { providers } };
};

export default function Login({
  providers,
}: {
  providers: RecordValues<NonNullable<Awaited<ReturnType<typeof getProviders>>>>;
}) {
  return (
    <main className="mx-auto text-center mt-25">
      <section className="w-full max-w-sm rounded-lg bg-white p-4 shadow-md dark:bg-transparent sm:p-6 lg:p-4"></section>
      <GoogleLoginButton onClick={() => signIn('google', { callbackUrl: '/' })} />
    </main>
  );
}

export function GoogleLoginButton({ onClick }: { onClick: () => ReturnType<typeof signIn> }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={clsx(
        'text-md group relative mb-2 inline-flex max-w-full w-64 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 p-0.5 font-medium text-gray-900 hover:text-white dark:text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 shadow-lg shadow-blue-500/50 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:shadow-lg dark:shadow-blue-800/80 dark:focus:ring-blue-800'
      )}
    >
      <span className="relative flex w-full items-center justify-center rounded-md bg-white px-5 py-2.5 align-middle transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
        <svg
          className="w-4 h-4 mr-2 -ml-1"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
        <label className="text-center w-full hover:cursor-pointer">Sign in with Google</label>
      </span>
    </button>
  );
}

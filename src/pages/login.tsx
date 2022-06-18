import * as React from 'react';
import { signIn, getProviders } from 'next-auth/react';
import type { GetServerSideProps } from 'next';
import type { RecordValues } from '@/types';

export const AUTH_PROVIDERS_BUTTONS: Partial<
  Record<
    keyof NonNullable<Awaited<ReturnType<typeof getProviders>>>,
    Record<'LoginButton', React.FC<{ onClick: () => Promise<void> }>>
  >
> = {
  google: { LoginButton: GoogleLoginButton },
};

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  console.log({ providers });
  return { props: { providers } };
};

export default function Login({
  providers,
}: {
  providers: RecordValues<NonNullable<Awaited<ReturnType<typeof getProviders>>>>;
}) {
  return (
    <main className="mx-auto text-center mt-25">
      {Object.values(providers)?.map(provider => {
        const item = AUTH_PROVIDERS_BUTTONS[provider.id];
        if (!item) return null;
        const { LoginButton } = item;
        return <LoginButton key={provider.id} onClick={() => signIn(provider.id, { callbackUrl: '/' })} />;
      })}
    </main>
  );
}

export function GoogleLoginButton({ onClick }: { onClick: () => Promise<void> }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
    >
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
      Sign in with Google
    </button>
  );
}

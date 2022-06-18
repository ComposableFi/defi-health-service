import Link from 'next/link';
import * as React from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

interface HeaderItem {
  name: string;
  path: string;
}

const HEADER_ITEMS: ReadonlyArray<HeaderItem> = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Settings',
    path: '/settings',
  },
] as const;

export function Header() {
  const { status } = useSession();
  if (status !== 'authenticated') return null;
  return (
    <div className="flex m-1 justify-between px-4 sm:px-5 bg-transparent font-mono">
      <nav className="flex items-center justify-between w-full relative border-gray-200 dark:border-gray-700 mx-auto bg-opacity-60 sm:px-6 text-lg sm:text-xl align-bottom">
        <ul className="space-x-4 sm:space-x-7 flex">
          {HEADER_ITEMS.map(({ name, path }) => {
            return (
              <Link href={path} key={name} passHref>
                <li className="rounded-lg font-bold text-gray-600 transition-all hover:bg-gray-200 dark:text-gray-200 py-1 dark:hover:text-gray-50 px-2 sm:px-3 sm:w-auto align-bottom hover:cursor-pointer dark:hover:bg-gray-800 border border-transparent dark:hover:(border border-gray-700)">
                  {name}
                </li>
              </Link>
            );
          })}
        </ul>
        <div>
          <button
            className="rounded-lg font-bold text-gray-600 transition-all hover:bg-gray-200 dark:text-gray-200 bg-transparent py-[0.8] text-gray-50 px-2 sm:w-auto align-bottom hover:cursor-pointer dark:hover:bg-gray-800 border border-transparent dark:hover:(border border-gray-600)"
            onClick={() => signOut({ callbackUrl: '/login' })}
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

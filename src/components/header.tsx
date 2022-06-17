import Link from 'next/link';
import * as React from 'react';

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
  {
    name: 'Logout',
    path: '/logout',
  },
] as const;

export function Header() {
  return (
    <div className="flex m-2 justify-between px-4 sm:px-5 pt-1 bg-transparent font-mono">
      <nav className="flex items-center justify-between w-full relative border-gray-200 dark:border-gray-700 mx-auto bg-opacity-60 sm:px-6 text-xl align-bottom">
        <ul className="space-x-4 sm:space-x-7 flex">
          {HEADER_ITEMS.map(({ name, path }) => {
            return (
              <Link href={path} key={name} passHref>
                <li className="rounded-lg font-bold text-gray-600 transition-all hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800 py-1 dark:hover:text-gray-50 sm:px-3 sm:w-auto text-xl align-bottom hover:cursor-pointer">
                  {name}
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

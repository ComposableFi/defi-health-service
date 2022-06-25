
import { Menu } from '@headlessui/react';
import { MenuAlt2Icon } from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';
import { signOut } from 'next-auth/react';
import clsx from 'clsx';
export function Header({
  onMenuClick,
}: {
  onMenuClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <header className="w-full">
      <div className="relative z-10 flex-shrink-0 h-12 bg-transparent shadow-sm flex">
        <button
          type="button"
          className="border-r border-gray-900 px-4 text-gray-500 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-gray-600 rounded-sm md:hidden"
          onClick={onMenuClick}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 flex justify-between sm:justify-end px-4 sm:px-6">
          <div className="flex-1 flex sm:hidden">
            <form className="w-full flex md:ml-0 font-mono" action="#" method="GET">
              <label htmlFor="search-field" className="sr-only">
                Search all files
              </label>
              <div className="relative w-full text-gray-400">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2">
                  <SearchIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                </div>

                <input
                  name="search-field"
                  id="search-field"
                  className={clsx(
                    'h-full w-full max-w-86 border-transparent py-2 pl-8 pr-3 text-lg text-light-800 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 bg-transparent border-gray-800 rounded-lg'
                  )}
                  type="search"
                />
              </div>
            </form>
          </div>
          <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
            {/* Profile dropdown */}
            <Menu as="div" className="relative flex-shrink-0">
              <div>
                <Menu.Button
                  className="rounded-lg font-bold text-gray-600 transition-all hover:bg-gray-200 dark:text-gray-200 py-1 dark:hover:text-gray-50 px-1 sm:px-3 sm:w-auto align-bottom hover:cursor-pointer dark:hover:bg-gray-800 border border-transparent dark:hover:(border border-gray-700)"
                  onClick={() => signOut({ callbackUrl: '/login' })}
                >
                  <span className="sr-only">Open user menu</span>
                  LOGOUT
                </Menu.Button>
              </div>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}
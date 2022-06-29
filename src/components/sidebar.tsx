import clsx from 'clsx';
import type { Navigation } from '@/types';
import Link from 'next/link';

export function Sidebar({
  items,
  activePage,
  hidden,
}: {
  items: ReadonlyArray<Navigation>;
  activePage?: string;
  hidden?: boolean;
}) {
  if (hidden) return null;

  return (
    <div className="hidden w-28 bg-[rgb(17,17,17)] overflow-y-auto md:block text-md">
      <div className="w-full py-3 flex flex-col items-center h-full">
        <Link className="flex-shrink-0 flex items-center hover:cursor-pointer" passHref href="/">
          <img
            className="h-10 w-auto mt-2 hover:cursor-pointer"
            src="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🕹</text></svg>"
            alt="Workflow"
          />
        </Link>
        <div className="flex-1 mt-6 w-full space-y-1">
          {items.map(item => {
            const isActive = item.href === activePage;
            return (
              <Link
                passHref
                shallow
                key={item.name}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={clsx(
                  isActive
                    ? 'bg-[rgb(012,014,26)] text-white border border-gray-900'
                    : 'text-gray-100 hover:bg-dark-900 hover:text-white',
                  'group w-full p-3 flex flex-col items-center font-medium'
                )}
              >
                <a
                  className={clsx(
                    isActive
                      ? 'bg-dark-200 text-white border border-gray-900'
                      : 'text-gray-100 hover:bg-dark-500 hover:text-white',
                    'group w-full p-3 flex flex-col items-center font-medium w-full'
                  )}
                >
                  <item.icon
                    className={clsx(
                      isActive ? 'text-white' : 'text-light-900 group-hover:text-white',
                      'h-6 w-6'
                    )}
                    aria-hidden="true"
                  />
                  <span className="mt-2">{item.name}</span>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

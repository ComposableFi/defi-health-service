import * as React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import type { Navigation } from '@/types';
import Link from 'next/link';

export function MobileMenu({
  items,
  activePage,
  open,
  setOpen,
}: {
  items: ReadonlyArray<Navigation>;
  activePage?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog as="div" className="relative z-20 md:hidden" onClose={setOpen}>
        <Transition.Child
          as={React.Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
        <XIcon className="w-24" />

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={React.Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative max-w-xs w-full bg-dark-800 pt-5 pb-4 flex-1 flex flex-col">
              <Transition.Child
                as={React.Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-1 right-0 -mr-16 p-1">
                  <button
                    type="button"
                    className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-white focus:ring-opacity-40"
                    onClick={() => setOpen(false)}
                  >
                    <XIcon
                      className="h-6 w-6 text-white border-red-500 outline-red-500 ring-red-500"
                      aria-hidden="true"
                    />
                    <span className="sr-only">Close sidebar</span>
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 px-4 flex items-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                  alt="Workflow"
                />
              </div>

              <div className="mt-5 flex-1 h-0 px-2 overflow-y-auto">
                <nav className="h-full flex flex-col">
                  <div className="space-y-1">
                    {items.map(item => {
                      const isActive = item.href === activePage;
                      return (
                        <Link
                          passHref
                          shallow
                          key={item.name}
                          href={item.href}
                          aria-current={isActive ? 'page' : undefined}
                        >
                          <a
                            className={clsx(
                              isActive
                                ? 'bg-dark-100 border border-dark-100 text-white'
                                : 'text-gray-100 hover:bg-dark-300 hover:text-white',
                              'group py-2 px-3 rounded-md flex items-center text-sm font-medium'
                            )}
                          >
                            <item.icon
                              className={clsx(
                                isActive ? 'text-white' : 'text-gray-300 group-hover:text-white',
                                'mr-3 h-6 w-6'
                              )}
                              aria-hidden="true"
                            />
                            <span>{item.name}</span>
                          </a>
                        </Link>
                      );
                    })}
                  </div>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true" />
        </div>
      </Dialog>
    </Transition.Root>
  );
}

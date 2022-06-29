import { Fragment, useState } from 'react';
import { Listbox, Transition, Menu } from '@headlessui/react';
import { CheckIcon, SelectorIcon, DotsVerticalIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { truncateAddress } from '@/lib/utilities';
import { useFilterList } from '@/hooks/use-filter-list';

const CONTRACT_ADDRESSES = [
  {
    contract: '0x0000000000000000000000000000000000000000',
    name: 'C1',
  },
  {
    contract: '0x0000000000000000000000000000000000000001',
    name: 'C2',
  },
  {
    contract: '0x0000000000000000000000000000000000000002',
    name: 'C3',
  },
  {
    contract: '0x0000000000000000000000000000000000000003',
    name: 'C4',
  },
];

export default function Example() {
  const [selectedMultiple, setSelectedMultiple] = useState<Array<typeof CONTRACT_ADDRESSES[0]>>([]);
  const [filteredRows, onSearch, setText, text] = useFilterList<typeof CONTRACT_ADDRESSES[0]>(
    CONTRACT_ADDRESSES,
    'name'
  );
  console.log({ text });

  const [showListbox, setShowListbox] = useState(false);

  return (
    <main className="w-full">
      <div className={clsx('w-92 text-xs')}>
        <input
          className={clsx('text-black w-full h-7 p-2 placeholder-black')}
          name="search-contracts"
          key="search-contracts"
          placeholder={selectedMultiple
            .map(item => truncateAddress({ address: item?.contract }))
            .join(', ')}
          onChange={onSearch}
          onFocus={() => setShowListbox(true)}
          onBlur={() => setShowListbox(false)}
        />
        <Listbox value={selectedMultiple} onChange={setSelectedMultiple} multiple>
          {({ open }) => (
            <>
              <div className="relative text-black border-t border-t-gray-200">
                <Listbox.Button className="h-7 relative w-full bg-white border border-gray-300 rounded-b-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open || showListbox}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {filteredRows.map(item => (
                      <Listbox.Option
                        key={item.contract}
                        className={({ active }) =>
                          clsx(
                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                            'cursor-default select-none relative py-2 pl-3 pr-9'
                          )
                        }
                        value={item}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex">
                              <span
                                className={clsx(
                                  selected ? 'font-semibold' : 'font-normal',
                                  'truncate'
                                )}
                              >
                                {item.name}
                              </span>
                              <span
                                className={clsx(
                                  active ? 'text-indigo-200' : 'text-gray-500',
                                  'ml-2 truncate'
                                )}
                              >
                                {item.contract}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={clsx(
                                  active ? 'text-white' : 'text-indigo-600',
                                  'absolute inset-y-0 right-0 flex items-center pr-4'
                                )}
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
        {/* <Listbox
          value={selectedMultiple}
          onChange={setSelectedMultiple}
          multiple
          name="select-contract"
        >
          {({ open }) => {
            return (
              <div className="relative border-t border-t-gray-800 dark:text-black">
                <Listbox.Button className="relative w-full cursor-default rounded-b-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 h-8">
                  <span className="block truncate">
                    {selectedMultiple
                      .map(item => truncateAddress({ address: item?.contract }))
                      .join(', ')}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </Listbox.Button>
                <Transition
                  show={open || showListbox}
                  as={Fragment}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-xs">
                    {filteredRows.map(item => {
                      return (
                        <Listbox.Option key={item.contract} value={item} as={Fragment}>
                          {({ active, selected }) => {
                            return (
                              <li
                                className={clsx(
                                  'relative cursor-default select-none py-1 pl-2 border-[1px]',
                                  active ? 'bg-amber-100' : 'text-gray-900',
                                  selected
                                    ? 'bg-green-100 border-green-700'
                                    : 'border-transparent text-gray-900'
                                )}
                              >
                                <span
                                  className={clsx(
                                    `block truncate pl-6`,
                                    selected ? 'font-medium' : 'font-normal opacity-50'
                                  )}
                                >
                                  {item.name}
                                  {': '}
                                  {truncateAddress({
                                    address: item.contract,
                                    length: 12,
                                  })}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-amber-600">
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </li>
                            );
                          }}
                        </Listbox.Option>
                      );
                    })}
                  </Listbox.Options>
                </Transition>
              </div>
            );
          }}
        </Listbox> */}
      </div>
    </main>
  );
}

import * as React from 'react';
import clsx from 'clsx';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import { newServiceSchema } from '@/lib/schema.zod';
import type { NewServiceSchema } from '@/lib/schema.zod';
import { Fragment, useState } from 'react';
import { Listbox, Transition, Menu } from '@headlessui/react';
import { CheckIcon, SelectorIcon, XIcon } from '@heroicons/react/solid';
import { truncateAddress } from '@/lib/utilities';
import { addNewService } from '@/lib/mutations';
import { useFilterList, useOnClickOutside } from '@/hooks';

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
export default function NewService() {
  const [selectedOptions, setSelectedOptions] = useState<Array<typeof CONTRACT_ADDRESSES[0]>>([]);

  const mutation = useMutation(addNewService, {
    onError: error => {
      console.log(error);
      setFormStatus({ status: 'ERROR', message: JSON.stringify(error, null, 2) });
      toast.error(JSON.stringify(error, null, 2), { duration: Infinity });
    },
    onSuccess: () => {
      const formElement = document.querySelector(
        'form#new-service-form'
      ) as unknown as HTMLFormElement;
      formElement.reset();
      setSelectedOptions([]);
      setFormStatus({ status: 'SUCCESS' });
      toast.success('Success: New service added: ', { duration: 5000 });
    },
    onMutate: data => {
      toast.remove();
      setFormStatus({ status: 'SUBMITTING' });
    },
    onSettled: () => {
      setFormStatus({ status: 'IDLE' });
    },
  });

  const [formStatus, setFormStatus] = React.useState<{
    status: 'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR';
    message?: string | null;
  }>({ status: mutation.isLoading ? 'SUBMITTING' : 'IDLE' });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.remove();
    setFormStatus({ status: 'SUBMITTING' });
    const formData = new FormData(event.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    const validatedForm = await newServiceSchema.safeParseAsync(fieldValues);
    if (!validatedForm.success) {
      setFormStatus({ status: 'ERROR', message: validatedForm.error.message });
      toast.error(validatedForm.error.message, { duration: Infinity });
      return;
    }
    mutation.mutate(fieldValues as NewServiceSchema);
  };

  return (
    <main className="w-full mx-auto space-y-4 uppercase font-mono text-light-900">
      <h1 className="text-center text-2xl font-semibold">ADDING A NEW SERVICE</h1>
      <div className="shadow overflow-hidden mt-5 md:mt-0 md:col-span-2 md:gap-6 w-full mx-auto max-w-lg">
        <form onSubmit={handleSubmit} id="new-service-form">
          <div className="grid grid-cols-6 gap-3 sm:gap-6 px-4 py-3 sm:py-5 bg-white sm:p-6 dark:bg-dark-700 rounded-md sm:rounded-lg">
            <div className="col-span-6">
              <label htmlFor="name" className="block text-md font-medium text-light-800">
                Name
              </label>
              <input
                minLength={2}
                required
                type="text"
                name="name"
                id="name"
                title="Name"
                className="mt-1 focus:ring-gray-200 focus:border-gray-500 block w-full shadow-sm sm:text-md border-gray-500 rounded-md text-light-600 bg-dark-300 p-2"
              />
            </div>

            <div className="col-span-6">
              <label
                htmlFor="contract_address"
                className="block text-md font-medium text-light-800 mb-0.5"
              >
                Contract Address
              </label>
              <Select<typeof CONTRACT_ADDRESSES[0]>
                id="contract_address"
                name="contract_address"
                title="contract_address"
                options={selectedOptions}
                setSelectedOptions={options => setSelectedOptions(options)}
              />
            </div>
            <div className="col-span-2 sm:col-span-3">
              <label htmlFor="chain_id" className="block text-md font-medium text-light-800">
                Chain ID
              </label>
              <input
                min={1}
                required
                type="text"
                name="chain_id"
                id="chain_id"
                title="Chain ID"
                pattern="[1-9][0-9]*"
                className="mt-1 focus:ring-gray-200 focus:border-gray-500 block w-full shadow-sm sm:text-md border-gray-500 rounded-md text-light-600 bg-dark-300 p-2"
              />
            </div>
            <div className="col-span-4 sm:col-span-3">
              <label htmlFor="health_status" className="block text-md font-medium text-light-800">
                Health Status
              </label>
              <select
                id="health_status"
                name="health_status"
                className="mt-1 block w-full py-2 px-3 border border-gray-500 bg-dark-1 rounded-md shadow-sm focus:outline-none focus:ring-gray-200 focus:border-gray-500 sm:text-md text-light-900 bg-dark-300 p-2 uppercase"
              >
                <option>HEALTHY</option>
                <option>DEGRADED</option>
                <option>COMPROMISED</option>
              </select>
            </div>
            <div className="col-span-6">
              <label htmlFor="webhook_url" className="block text-md font-medium text-light-800">
                Webhook URL
              </label>
              <input
                required
                type="url"
                pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
                name="webhook_url"
                title="Webhook URL"
                id="webhook_url"
                className="mt-1 focus:ring-gray-200 focus:border-gray-500 block w-full shadow-sm sm:text-md border-gray-500 rounded-md bg-dark-300 p-2"
              />
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-dark-900">
            <button
              className={clsx(
                'inline-flex justify-center py-2 border-gray-500 shadow-sm text-xl font-semibold text-black bg-[rgb(0,227,150)] hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-transparent w-full h-full min-h-full rounded-b-md tracking-wider',
                formStatus.status === 'SUBMITTING' && 'bg-gray-500 cursor-wait',
                'focus:delay-0.3s ease-in-out duration-300 transition-colors'
              )}
              disabled={formStatus.status === 'SUBMITTING'}
            >
              {formStatus.status === 'SUBMITTING' ? 'SUBMITTING...' : 'SUBMIT'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export function Select<T>({
  name,
  id,
  title,
  options,
  setSelectedOptions,
}: {
  name: string;
  id: string;
  title: string;
  onSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedOptions: React.Dispatch<React.SetStateAction<T[]>>;
  options: Array<T>;
}) {
  const [searchText, setSearchText] = useState('');

  const [showListbox, setShowListbox] = useState(false);

  const ref = React.useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref, () => setShowListbox(false));

  const onBackspace = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (options.length === 0 || searchText.length > 0) return;
    if (event.key !== 'Backspace') return;
    setSelectedOptions(options.filter((_, idx) => idx !== options.length - 1));
  };

  const [filteredRows, onSearch] = useFilterList<typeof CONTRACT_ADDRESSES[0]>(
    CONTRACT_ADDRESSES,
    'name'
  );

  return (
    <div className="w-full text-xs align-middle" ref={ref}>
      <input
        readOnly
        hidden
        value={options.map(item => (item as any).contract)}
        name={name}
        title={title}
      />
      <div className="flex max-w-full">
        <div
          className={clsx(
            'w-full block w-full shadow-sm sm:text-md text-xs rounded-md rounded-r-none text-light-600 bg-dark-300 flex border-gray-600 border-[2px] px-2 max-w-full truncate overflow-x-auto border-[1px] shadow-sm',
            options && options.length === 0 && 'py-2.5'
          )}
        >
          <ul id={id} title={title} className="flex max-w-full">
            {options?.map((item, index) => {
              return (
                <li
                  key={index}
                  className={clsx(
                    'bg-green-100 text-green-800 mr-2 pl-1.5 rounded dark:bg-green-200 dark:text-green-900 flex w-full align-middle space-x-1 divide-black divide-x max-w-full'
                  )}
                >
                  <label className="py-0.5 max-w-full truncate overflow-x-hidden">
                    {truncateAddress({
                      address: (item as any).contract,
                      length:
                        options.length === 1
                          ? Infinity
                          : options.length === 2
                          ? 20
                          : options.length === 3
                          ? 12
                          : options.length === 4
                          ? 7
                          : options.length === 5
                          ? 4
                          : options.length === 6
                          ? 2
                          : 1,
                    })}
                  </label>
                  <button
                    className="w-3 text-black py-0.5 hover:text-gray-600"
                    onClick={event => {
                      event.preventDefault();
                      setSelectedOptions(options.filter((_, idx) => idx !== index));
                      console.log({ options, index });
                    }}
                  >
                    <XIcon />
                  </button>
                </li>
              );
            })}
          </ul>
          <input
            required={options.length === 0}
            className="focus:(ring-gray-100 ring-0 outline-none) block w-full bg-transparent border-gray-500 shadow-sm"
            value={searchText}
            onKeyDown={onBackspace}
            onChange={event => {
              onSearch(event);
              setSearchText(event.target.value);
              if (event.target.value.length > 0) setShowListbox(true);
              else setShowListbox(false);
            }}
          />
        </div>
        <div className="relative">
          <button
            className="h-full relative w-full bg-white dark:bg-dark-300 border border-gray-500 border-l-0 rounded-r-md shadow-sm p-4 text-left cursor-default focus:outline-none focus:ring-1 text-xs sm:text-sm hover:cursor-pointer focus:(ring-gray-100 ring-0 outline-none border-gray-500)"
            onClick={() => setShowListbox(!showListbox)}
            type="button"
          >
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>
      <Listbox value={options} onChange={setSelectedOptions} multiple>
        {({ open }) => (
          <>
            <div className="relative text-black">
              <Transition
                show={open || showListbox}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  className={clsx(
                    'absolute z-10 mt-1 min-w-full bg-white shadow-lg max-h-60 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none w-full',
                    'dark:(bg-dark-100 text-white)'
                  )}
                >
                  {filteredRows.map(item => (
                    <Listbox.Option
                      key={(item as any).contract}
                      className={({ active, selected }) =>
                        clsx(
                          selected
                            ? 'text-white bg-green-700 sm:text-sm'
                            : 'text-gray-400 sm:text-base',
                          'cursor-default select-none relative py-2 pl-3 pr-9 text-xs'
                        )
                      }
                      value={item}
                    >
                      {({ selected, active }) => {
                        return (
                          <>
                            <div className="flex">
                              <span
                                className={clsx(
                                  selected ? 'font-semibold text-white' : 'font-normal'
                                  // 'truncate'
                                )}
                              >
                                {(item as any).name}
                              </span>
                              <span
                                className={clsx(
                                  selected
                                    ? 'font-semibold text-white ml-2 truncate'
                                    : 'font-normal',

                                  'ml-2'
                                )}
                              >
                                {(item as any).contract}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={clsx(
                                  'text-white',
                                  'absolute inset-y-0 right-0 flex items-center pr-4'
                                )}
                              >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : (
                              <></>
                            )}
                          </>
                        );
                      }}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
}

import clsx from 'clsx';
import Link from 'next/link';
import * as React from 'react';
import { toast } from 'react-hot-toast';
import type { GetStaticProps } from 'next';
import { dehydrate, QueryClient, useQuery, useMutation, useQueryClient } from 'react-query';
import { Transition, Dialog } from '@headlessui/react';
import { PencilAltIcon } from '@heroicons/react/solid';
import { Tabs } from '@/components/tabs';
import { Badge } from '@/components/badge';
import { fetchServices } from '@/lib/queries';
import { updateService } from '@/lib/mutations';
import { dateToNumeric } from '@/lib/utilities';
import { SearchBar } from '@/components/search-bar';
import { newServiceSchema, type ServiceSchema } from '@/lib/zod/schema.zod';
import { useIsMounted, useFilterList } from '@/hooks';

import { prisma } from '@/lib/prisma';
export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['services'], async () => await prisma.service.findMany());
  return {
    props: { dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))) },
    revalidate: 1,
  };
};

export default function Home() {
  const isMounted = useIsMounted();

  const { data, error, status } = useQuery(['services'], fetchServices);

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [filteredRows, onSearch, setText] = useFilterList<ServiceSchema>(
    [data?.data][selectedTab] as Array<ServiceSchema>,
    'name'
  );
  const [selectedRow, setSelectedRow] = React.useState<ServiceSchema | null>(null);

  const modalRef = React.useRef<
    {
      open: () => void;
      close: () => void;
      toggle: () => void;
    } & HTMLDivElement
  >(null);

  if (!isMounted) return null;
  return (
    <main className="mt-10">
      <p className="text-center text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight uppercase mb-5 sm:mb-8 font-bold texrt-light-900 font-serif">
        Defi Health Service
      </p>
      <div className="max-w-2xl relative overflow-x-auto mx-auto">
        <div className="max-w-md w-xs sm:mx-1 mx-auto">
          <SearchBar onInputChange={onSearch} text="Search for service" />
        </div>
        <Tabs
          activeTab={selectedTab}
          onTabChange={index => {
            const search = document.querySelector('input#search') as unknown as HTMLInputElement;
            search.value = '';
            setText('');
            setSelectedTab(index);
          }}
          tabs={[
            { index: 0, label: 'Services' },
            { index: 1, label: 'Contracts' },
            { index: 1, label: 'Chains' },
          ]}
        />
        <table className="max-w-full sm:w-9xl text-sm sm:text-lg text-left text-gray-500 dark:text-gray-400 mx-auto border-3 border-t-transparent border-dark-100 border-b border-l border-r">
          <thead className="text-xs font-500 text-gray-700 uppercase bg-gray-50 dark:bg-transparent dark:text-gray-300 rounded-full text-sm p-8">
            <tr className="">
              <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 max-w-1">
                update
              </th>
              <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3">
                name
              </th>
              <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3">
                updated at
              </th>
              <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 ">
                status
              </th>
            </tr>
          </thead>
          <tbody className="rounded-lg sm:rounded-lg">
            {filteredRows?.map((item, index) => {
              const {
                id,
                name,
                health_status,
                updated_at,
                created_at,
                chain_id,
                contract_address,
              } = item;
              if (!name) return null;
              return (
                <tr
                  className="bg-white border-b dark:bg-[rgb(17,17,17)] dark:border-gray-700 hover:bg-light-50 dark:hover:bg-dark-100 selection:dark:text-white"
                  key={index}
                >
                  <td className="px-3 sm:px-2 py-2 sm:py-4 text-cetner mx-auto justify-center flex">
                    <button
                      className="w-full text-right px-6 text-gray-400 hover:text-gray-100"
                      onClick={event => {
                        event.preventDefault();
                        modalRef.current?.toggle();
                        setSelectedRow(item);
                      }}
                    >
                      <PencilAltIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </td>
                  <td
                    scope="row"
                    className="px-3 sm:px-6 py-2 sm:py-4 font-500 text-gray-900 dark:text-light-900 whitespace-nowrap sm:tracking-wide max-w-38"
                  >
                    <Link
                      className="underline-transparent"
                      href={{
                        pathname: `/settings/${id}`,
                      }}
                      shallow
                    >
                      <a className="hover:text-blue-500">{name}</a>
                    </Link>
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm hover:text-white dark:text-gray-300">
                    {updated_at && dateToNumeric(new Date(updated_at).toISOString())}
                  </td>
                  <td className="px-3 sm:px-2 py-2 sm:py-4 place-self-start self-start">
                    <Badge
                      text={health_status}
                      color={
                        health_status.toUpperCase() === 'HEALTHY'
                          ? 'green'
                          : health_status.toUpperCase() === 'DEGRADED'
                          ? 'yellow'
                          : health_status.toUpperCase() === 'COMPROMISED'
                          ? 'red'
                          : 'gray'
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Modal for editing service */}
      <Modal ref={modalRef} selectedRow={selectedRow} />
    </main>
  );
}

interface ModalRefHandler {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

interface ModalRefProps {
  selectedRow: ServiceSchema | null;
  children?: React.ReactNode;
}

export const Modal = React.forwardRef<ModalRefHandler, ModalRefProps>((props, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  React.useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen(_ => !_),
    }),
    []
  );
  const [formData, setFormData] = React.useState<ServiceSchema | null>(props.selectedRow);
  React.useEffect(() => setFormData(props.selectedRow), [props.selectedRow]);

  const nameRef = React.useRef<HTMLInputElement>(null);
  const healthStatusRef = React.useRef<HTMLSelectElement>(null);
  const chainIdRef = React.useRef<HTMLInputElement>(null);
  const contractAddressRef = React.useRef<HTMLInputElement>(null);
  const webhookUrlRef = React.useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const mutation = useMutation(updateService, {
    onError: error => {
      console.log(error);
      setFormStatus({ status: 'ERROR', message: JSON.stringify(error, null, 2) });
      toast.error(JSON.stringify(error, null, 2), { duration: Infinity });
    },
    onSuccess: () => {
      const formElement = document.querySelector(
        'form#update-service-form'
      ) as unknown as HTMLFormElement;
      queryClient.invalidateQueries(['services']);
      formElement.reset();
      setIsOpen(false);
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
    mutation.mutate({ ...props.selectedRow, ...fieldValues } as ServiceSchema);
  };

  if (!isOpen) return null;
  return (
    <>
      <div>{props.children}</div>
      {formData && (
        <Transition show={isOpen} as={React.Fragment}>
          <Dialog as="div" className="relative z-10 rounded-t-lg" onClose={() => setIsOpen(false)}>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto flex min-h-full items-center justify-center text-center min-h-full rounded-t-lg">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="w-full max-w-md transform overflow-hidden rounded-2xl bg-transparent text-left align-middle shadow-xl transition-all dark:text-black shadow overflow-hidden mt-5 md:mt-0 md:col-span-2 md:gap-6 w-full mx-auto max-w-lg"
                  // onClick={event => console.log(event)}
                >
                  <form id="update-service-form" className="rounded-t-lg" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-6 gap-3 sm:gap-6 px-4 py-3 sm:py-5 bg-white sm:p-6 dark:bg-dark-700 rounded-t-md sm:rounded-t-lg">
                      <div className="col-span-6">
                        <label htmlFor="name" className="block text-md font-medium text-light-800">
                          Name
                        </label>
                        <input
                          ref={nameRef}
                          value={formData?.name}
                          onChange={event => {
                            nameRef.current?.focus();
                            setFormData({ ...formData, name: event.target.value });
                          }}
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
                        <input
                          ref={contractAddressRef}
                          value={formData?.contract_address}
                          onChange={event => {
                            contractAddressRef.current?.focus();
                            setFormData({ ...formData, contract_address: event.target.value });
                          }}
                          minLength={42}
                          maxLength={42}
                          required
                          type="text"
                          id="contract_address"
                          name="contract_address"
                          title="contract_address"
                          className="mt-1 focus:ring-gray-200 focus:border-gray-500 block w-full shadow-sm sm:text-md border-gray-500 rounded-md text-light-600 bg-dark-300 p-2"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-3">
                        <label
                          htmlFor="chain_id"
                          className="block text-md font-medium text-light-800"
                        >
                          Chain ID
                        </label>
                        <input
                          ref={chainIdRef}
                          value={formData?.chain_id}
                          onChange={event => {
                            chainIdRef.current?.focus();
                            setFormData({ ...formData, chain_id: event.target.value });
                          }}
                          min={1}
                          required
                          type="text"
                          name="chain_id"
                          id="chain_id"
                          title="Chain ID - must be a number"
                          pattern="[1-9][0-9]*"
                          className="mt-1 focus:ring-gray-200 focus:border-gray-500 block w-full shadow-sm sm:text-md border-gray-500 rounded-md text-light-600 bg-dark-300 p-2"
                        />
                      </div>
                      <div className="col-span-4 sm:col-span-3">
                        <label
                          htmlFor="health_status"
                          className="block text-md font-medium text-light-800"
                        >
                          Health Status
                        </label>
                        <select
                          ref={healthStatusRef}
                          value={formData?.health_status.toUpperCase()}
                          defaultChecked={true}
                          onChange={event => {
                            healthStatusRef.current?.focus();
                            setFormData({ ...formData, health_status: event.target.value as any });
                          }}
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
                        <label
                          htmlFor="webhook_url"
                          className="block text-md font-medium text-light-800"
                        >
                          Webhook URL
                        </label>
                        <input
                          ref={webhookUrlRef}
                          value={formData?.webhook_url}
                          onChange={event => {
                            webhookUrlRef.current?.focus();
                            setFormData({ ...formData, webhook_url: event.target.value });
                          }}
                          required
                          type="url"
                          pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
                          name="webhook_url"
                          title="Webhook URL"
                          id="webhook_url"
                          className="mt-1 focus:ring-gray-200 focus:border-gray-500 block w-full shadow-sm sm:text-md border-gray-500 rounded-md text-light-600 bg-dark-300 p-2"
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-dark-900">
                      <button
                        className={clsx(
                          'inline-flex justify-center py-2 border-gray-500 shadow-sm text-xl font-semibold text-black bg-[rgb(0,227,150)] hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-transparent w-full h-full min-h-full rounded-b-md tracking-wider',
                          // formStatus.status === 'SUBMITTING' && 'bg-gray-500 cursor-wait',
                          'focus:delay-0.3s ease-in-out duration-300 transition-colors'
                        )}
                        // disabled={formStatus.status === 'SUBMITTING'}
                      >
                        SUBMIT
                        {/* {formStatus.status === 'SUBMITTING' ? 'SUBMITTING...' : 'SUBMIT'} */}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
});
Modal.displayName = 'Modal';

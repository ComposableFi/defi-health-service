import * as React from 'react';
import clsx from 'clsx';
import { toast } from 'react-hot-toast';
import { useMutation } from 'graphql-hooks';

import { newServiceSchema } from '@/lib/schema.zod';
import { NEW_SERVICE_MUTATION } from '@/lib/graphql';
import type { NewServiceSchema } from '@/lib/schema.zod';

export default function NewService() {
  const [newService, { loading, error }] = useMutation<{
    insert_Services: { returning: Array<NewServiceSchema> };
  }>(NEW_SERVICE_MUTATION);

  const [formStatus, setFormStatus] = React.useState<{
    status: 'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR';
    message?: string | null;
  }>({ status: loading ? 'SUBMITTING' : 'IDLE' });

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
    const { data } = await newService({ variables: fieldValues });
    if (error || !data) {
      setFormStatus({ status: 'ERROR', message: 'swss' });
      toast.error('TODO: add error message', { duration: Infinity });
      return;
    }
    const formElement = document.querySelector(
      'form#new-service-form'
    ) as unknown as HTMLFormElement;
    formElement.reset();
    setFormStatus({ status: 'SUCCESS' });
    toast.success('Success', { duration: 5000 });
  };

  return (
    <main className="w-full mx-auto space-y-4 uppercase font-mono text-light-900">
      <h1 className="text-center text-2xl font-semibold">ADDING A NEW SERVICE</h1>
      <div className="mt-10 sm:mt-0">
        <div className="md:gap-6 w-full mx-auto max-w-lg">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit} id="new-service-form">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6 dark:bg-dark-700">
                  <div className="grid grid-cols-6 gap-6">
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
                        className="mt-1 focus:ring-gray-200 focus:border-gray-500 block w-full shadow-sm sm:text-md border-gray-500 rounded-md text-light-600 bg-dark-300 p-2"
                      />
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="contract_address"
                        className="block text-md font-medium text-light-800"
                      >
                        Contract Address
                      </label>
                      <input
                        required
                        type="text"
                        name="contract_address"
                        id="contract_address"
                        title="Contract Address"
                        pattern="(0x)?[a-fA-F0-9]{40}"
                        className="mt-1 focus:ring-gray-200 focus:border-gray-500 block w-full shadow-sm sm:text-md border-gray-500 rounded-md bg-dark-300 p-2"
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
                      <label
                        htmlFor="health_status"
                        className="block text-md font-medium text-light-800"
                      >
                        Health Status
                      </label>
                      <select
                        id="health_status"
                        name="health_status"
                        className="mt-1 block w-full py-2 px-3 border border-gray-500 bg-dark-1 rounded-md shadow-sm focus:outline-none focus:ring-gray-200 focus:border-gray-500 sm:text-md text-light-900 bg-dark-300 p-2 uppercase"
                      >
                        <option>A – (Good)</option>
                        <option>Unhealthy</option>
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
                        required
                        type="url"
                        name="webhook_url"
                        title="Webhook URL"
                        id="webhook_url"
                        className="mt-1 focus:ring-gray-200 focus:border-gray-500 block w-full shadow-sm sm:text-md border-gray-500 rounded-md bg-dark-300 p-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-dark-900 text-right">
                  <button
                    className={clsx(
                      'inline-flex justify-center py-2 border border-t-1 border-gray-500 shadow-sm text-xl font-semibold text-black bg-[rgb(0,227,150)] hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-transparent w-full h-full min-h-full h-12 rounded-b-md tracking-wider',
                      formStatus.status === 'SUBMITTING' && 'bg-gray-500 cursor-wait',
                      'focus:delay-0.3s ease-in-out duration-300 transition-colors'
                    )}
                    disabled={formStatus.status === 'SUBMITTING'}
                  >
                    {formStatus.status === 'SUBMITTING' ? 'SUBMITTING...' : 'SUBMIT'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

import * as React from 'react';

import { newServiceSchema } from '@/lib/schema.zod';
import type { NewServiceSchema } from '@/lib/schema.zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import clsx from 'clsx';

const NEW_SERVICE_MUTATION = `
  mutation (
    $id: bigint!,
    $created_at: timestamptz!,
    $name: String!,
    $chain_id: numeric!,
    $contract_address: String!,
    $webhook_url: _varchar!,
    $health_status: String!
  ) {
    insert_Services(objects: {
      id: $id,
      created_at: $created_at,
      name: $name,
      chain_id: $chain_id,
      contract_address: $contract_address,
      webhook_url: $webhook_url,
      health_status: $health_status
    }) {
      returning {
        chain_id
        contract_address
        created_at
        health_status
        id
        name
        webhook_url
      }
    }
  }
`;

const variables = {
  id: 2,
  chain_id: 1,
  contract_address: '0x0000000000000000000000000000000000000000',
  name: 'TheDAO',
  webhook_url: 'https://www.thedao.io',
  health_status: 'rugged',
  created_at: '2022-05-25T15:31:52+00:00',
};

export default function NewService() {
  const [formStatus, setFormStatus] = React.useState<{
    status: 'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR';
    message?: string | null;
  }>({ status: 'IDLE' });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus({ status: 'SUBMITTING' });
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
                    <div className="col-span-6 sm:col-span-4">
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

                    <div className="col-span-6 sm:col-span-2">
                      <label
                        htmlFor="last-name"
                        className="block text-md font-medium text-light-800"
                      >
                        Chain ID
                      </label>
                      <input
                        min={1}
                        required
                        type="text"
                        name="chainId"
                        id="chainId"
                        title="Chain ID"
                        pattern="[1-9][0-9]*"
                        className="mt-1 focus:ring-gray-200 focus:border-gray-500 block w-full shadow-sm sm:text-md border-gray-500 rounded-md text-light-600 bg-dark-300 p-2"
                      />
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="contractAddress"
                        className="block text-md font-medium text-light-800"
                      >
                        Contract Address
                      </label>
                      <input
                        required
                        type="text"
                        name="contractAddress"
                        id="contractAddress"
                        title="Contract Address"
                        pattern="(0x)?[a-fA-F0-9]{40}"
                        className="mt-1 focus:ring-gray-200 focus:border-gray-500 block w-full shadow-sm sm:text-md border-gray-500 rounded-md bg-dark-300 p-2"
                      />
                    </div>
                    <div className="col-span-6">
                      <label
                        htmlFor="webhookURL"
                        className="block text-md font-medium text-light-800"
                      >
                        Webhook URL
                      </label>
                      <input
                        required
                        type="url"
                        name="webhookURL"
                        title="Webhook URL"
                        id="webhookURL"
                        className="mt-1 focus:ring-gray-200 focus:border-gray-500 block w-full shadow-sm sm:text-md border-gray-500 rounded-md bg-dark-300 p-2"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="status" className="block text-md font-medium text-light-800">
                        Current Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        className="mt-1 block w-full py-2 px-3 border border-gray-500 bg-dark-1 rounded-md shadow-sm focus:outline-none focus:ring-gray-200 focus:border-gray-500 sm:text-md text-light-900 bg-dark-300 p-2"
                      >
                        <option>Healthy</option>
                        <option>Unhealthy</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-dark-900 text-right">
                  <button
                    /**color .3s, background-color .3s; */
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

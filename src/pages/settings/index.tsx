import Link from 'next/link';
import * as React from 'react';
import { Badge } from '@/components/badge';
import { SearchBar } from '@/components/search-bar';
import { CryptoIcon } from '@/components/icons/crypto-icons';
import { dateToNumeric } from '@/lib/utilities';
import type { Service } from '@/types';
import clsx from 'clsx';

const _services = [
  {
    updated_at: '2022-06-15T16:44:38.204521+00:00',
    name: 'Hop',
    is_healthy: false,
    id: 1,
    created_at: '2022-06-15T16:44:38.204521+00:00',
  },
  {
    updated_at: '2022-06-16T16:48:54.037639+00:00',
    name: 'Synapse',
    is_healthy: true,
    id: 2,
    created_at: '2022-06-16T16:48:54.037639+00:00',
  },
];

function filterServices({ text, services }: { text: string; services: Service[] }) {
  return services.filter(({ name }) => name.toLowerCase().includes(text.toLowerCase()));
}

export default function Settings() {
  const [services, setServices] = React.useState<Service[] | []>([]);

  const [filteredServices, setFilteredServices] = React.useState<Service[] | []>(services);

  function searchFiltering(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    const filtered = filterServices({ text: value, services });
    setFilteredServices(filtered);
  }

  return (
    <main>
      <p className="text-center text-3xl font-extrabold text-slate-100 tracking-tight uppercase sm:mb-5 font-sans font-bold">
        Settings
      </p>
      <div className="relative overflow-x-auto shadow-md rounded-md sm:rounded-lg">
        <div className="text-center max-w-4xl w-xs">
          <SearchBar onInputChange={searchFiltering} text="Search for service" />
        </div>
        <ul onClickCapture={event => console.log(event.target)}>
          {filteredServices?.map(({ id, name, is_healthy, updated_at, created_at }, index) => {
            return (
              <li className="w-full flex justify-evenly" key={index}>
                <div className="w-15 p-4 pb-0">
                  <div className="flex items-center -bottom-2">
                    <CryptoIcon name={name} />
                  </div>
                </div>
                <div
                  // scope="row"
                  className="px-3 sm:px-6 py-2 sm:py-4 font-600 text-gray-900 dark:(text-blue-400 hover:bg-gray-800) whitespace-nowrap hover:(text-blue-600 underline underline-offset-4 underline-offset-8) sm:tracking-wide"
                >
                  <Link
                    href={{
                      pathname: `/settings/${id}`,
                    }}
                    shallow
                  >
                    <a>{name}</a>
                  </Link>
                </div>
                <div className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm hover:(text-white) dark:(text-gray-300 hover:bg-gray-800)">
                  {dateToNumeric(updated_at)}
                </div>

                <div className="px-3 sm:px-6 py-2 sm:py-4 dark:(hover:bg-gray-800)">
                  {is_healthy ? (
                    <Badge text="healthy" color="green" />
                  ) : (
                    <Badge text="unhealthy" color="red" />
                  )}
                </div>
                <div className="px-3 sm:px-6 py-2 sm:py-4 text-right dark:(hover:bg-gray-800)">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={event => {
                      event.preventDefault();
                      // TODO: implement
                      console.log('edit');
                    }}
                  >
                    Some Action
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}

import Head from 'next/head';
import * as React from 'react';
import { Badge } from '@/components/badge';
import { SearchBar } from '@/components/search-bar';
import { retrieveAllBridges } from '@/lib/hasura-api';
import { devLogger } from '@/lib/devLogger';
import { dateToNumeric } from '@/lib/utilities';
import type { Bridge, BridgeStatus } from '@/types';
import Link from 'next/link';

const _bridges = [
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

function filterBridges({ text, bridges }: { text: string; bridges: Bridge[] }) {
  // if (!bridges) return [];
  return bridges.filter(bridge => bridge.name.toLowerCase().includes(text.toLowerCase()));
}

export default function Home() {
  const [bridges, setBridges] = React.useState<Bridge[] | []>([]);

  const [filteredBridges, setFilteredBridges] = React.useState<Bridge[] | []>(bridges);

  function searchFiltering(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    const filtered = filterBridges({ text: value, bridges });
    setFilteredBridges(filtered);
  }

  const fetchBridgeData = async () => {
    const { bridges } = await retrieveAllBridges();
    // console.log(bridges);
    setBridges(bridges);
    setFilteredBridges(bridges);
  };

  React.useEffect(() => {
    fetchBridgeData();
  }, []);

  return (
    <main>
      <p className="text-center text-3xl font-extrabold text-slate-100 tracking-tight uppercase sm:mb-5 font-sans font-bold">
        Defi Health Service
      </p>
      <div className="relative overflow-x-auto shadow-md rounded-md sm:rounded-lg">
        <SearchBar onInputChange={searchFiltering} text="Search for service" />
        <table className="w-full text-sm sm:text-lg text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="">
              <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3">
                name
              </th>
              <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3">
                updated at
              </th>
              <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3">
                status
              </th>
              <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBridges?.map(({ id, name, is_healthy, updated_at, created_at }, index) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:(bg-gray-50) dark:hover:bg-gray-900 selection:(dark:text-white)"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-3 sm:px-6 py-2 sm:py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap hover:(text-blue-600 dark:text-blue-400 underline underline-offset-4 underline-offset-8)"
                  >
                    <Link
                      href={{
                        pathname: `/settings/${id}`,
                      }}
                      shallow
                    >
                      {name}
                    </Link>
                  </th>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm hover:(text-white) dark:(text-gray-300)">
                    {dateToNumeric(updated_at)}
                  </td>

                  <td className="px-3 sm:px-6 py-2 sm:py-4">
                    {is_healthy ? <Badge text="healthy" color="green" /> : <Badge text="unhealthy" color="red" />}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 text-right">
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={event => {
                        event.preventDefault();
                        // TODO: implement
                        console.log('edit');
                      }}
                    >
                      Enable
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}

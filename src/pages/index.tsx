import Head from 'next/head';
import * as React from 'react';
import UpdateBridgeButton from '@/components/update-bridge-button';
import { retrieveAllBridges } from '@/lib/hasura-api';
import { devLogger } from '@/lib/devLogger';
import { dateToNumeric } from '@/lib/utilities';
import type { Bridge, BridgeStatus } from '@/types';
import Link from 'next/link';

// date string to YYYY-MM-DD HH:MM:SS

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

function filterBridges({ text, bridges }: { text: string; bridges: Bridge[] | null }) {
  if (!bridges) return [];
  return bridges.filter(bridge => bridge.name.toLowerCase().includes(text.toLowerCase()));
}

export default function Home() {
  const [bridges, setBridges] = React.useState<Bridge[] | null>(null);

  const [filteredBridges, setFilteredBridges] = React.useState<Bridge[] | null>(bridges);

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
      <p className="text-center text-3xl font-extrabold text-slate-100 tracking-tight uppercase mb-5">Defi Health Service</p>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="p-4">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              onChange={searchFiltering}
              type="text"
              id="table-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for service"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {/* <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th> */}
              <th scope="col" className="px-6 py-3">
                name
              </th>
              <th scope="col" className="px-6 py-3">
                updated at
              </th>
              <th scope="col" className="px-6 py-3">
                status
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBridges?.map(({ id, name, is_healthy, updated_at, created_at }, index) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={index}
                >
                  {/* <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="checkbox-table-search-1" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td> */}
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {name}
                  </th>
                  <td className="px-6 py-4">{dateToNumeric(updated_at)}</td>

                  <td className="px-6 py-4">
                    {is_healthy ? (
                      <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900 w-full">
                        Healthy
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900 w-full">
                        Unhealthy
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={event => {
                        event.preventDefault();
                        // TODO: implement
                        console.log('edit');
                      }}
                    >
                      Enable / Disable
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

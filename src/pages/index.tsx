import Link from 'next/link';
import * as React from 'react';
import { Badge } from '@/components/badge';
import { SearchBar } from '@/components/search-bar';
import { CryptoIcon } from '@/components/icons/crypto-icons';
import { retrieveAllBridges } from '@/lib/hasura-api';
import { dateToNumeric } from '@/lib/utilities';
import type { Bridge } from '@/types';

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
    if (process.env.NODE_ENV === 'development') {
      setBridges(_bridges);
      setFilteredBridges(_bridges);
      return;
    }
    const { bridges } = await retrieveAllBridges();
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
        <div className="max-w-md w-xs">
          <SearchBar onInputChange={searchFiltering} text="Search for service" />
        </div>
        <table className="w-full text-sm sm:text-lg text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:(bg-gray-700 text-gray-300) font-500">
            <tr className="">
              <th scope="col" className="p-4 hidden sm:block" />
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
                  <td className="w-15 p-4 pb-0">
                    <div className="flex items-center -bottom-2">
                      <CryptoIcon name={name} />
                    </div>
                  </td>
                  <td
                    scope="row"
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
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm hover:(text-white) dark:(text-gray-300 hover:bg-gray-800)">
                    {dateToNumeric(updated_at)}
                  </td>

                  <td className="px-3 sm:px-6 py-2 sm:py-4 dark:(hover:bg-gray-800)">
                    {is_healthy ? <Badge text="healthy" color="green" /> : <Badge text="unhealthy" color="red" />}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 text-right dark:(hover:bg-gray-800)">
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

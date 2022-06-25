import Link from 'next/link';
import * as React from 'react';
import toast from 'react-hot-toast';
import { Badge } from '@/components/badge';
import { SearchBar } from '@/components/search-bar';
import { Tabs } from '@/components/tabs';
import { dateToNumeric } from '@/lib/utilities';
import type { Service } from '@/types';
import type { GetStaticProps } from 'next';
import { ToggleSwitch } from '@/components/toggle-switch';
import { useRowsFilter } from '@/hooks/use-filter-rows';
import clsx from 'clsx';
import { initializeGraphQL, graphQLRequest } from '@/lib/graphql';
import { useQuery } from 'graphql-hooks';

const fakeData = {
  services: [
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
  ],
  chains: [
    {
      updated_at: '2022-06-15T16:44:38.204521+00:00',
      name: 'Cosmos Hub',
      is_healthy: false,
      id: 1,
      created_at: '2022-06-15T16:44:38.204521+00:00',
    },
    {
      updated_at: '2022-06-16T16:48:54.037639+00:00',
      name: 'Polygon',
      is_healthy: true,
      id: 2,
      created_at: '2022-06-16T16:48:54.037639+00:00',
    },
    {
      updated_at: '2022-06-16T16:48:54.037639+00:00',
      name: 'Kusama',
      is_healthy: true,
      id: 2,
      created_at: '2022-06-16T16:48:54.037639+00:00',
    },
  ],
};

const QUERY_SERVICES = `
  query GET_ALL_SERVICES {
    Services {
      chain_id
      contract_address
      created_at
      health_status
      id
      name
      updated_at
      webhook_url
    }
  }
`;

export const getStaticProps: GetStaticProps = async context => {
  const client = initializeGraphQL();
  await graphQLRequest({
    client,
    query: QUERY_SERVICES,
    options: {},
  });

  return {
    props: { initializeGraphQLState: client.cache?.getInitialState() },
    revalidate: 1,
  };
};

export default function Home(props: { initializeGraphQLState?: object }) {
  console.log(JSON.stringify(props, null, 2));
  console.log(
    JSON.stringify(
      {
        url: `${process.env.NEXT_PUBLIC_HASURA_ENDPOINT}/graphql/v1`,
        url2: 'https://defi-health-service.hasura.app/v1/graphql',
      },
      null,
      2
    )
  );
  const [selectedTab, setSelectedTab] = React.useState(0);
  const rows = [fakeData.services, fakeData.chains][selectedTab] as Service[];

  const [filteredRows, onSearch, setText] = useRowsFilter<typeof rows[number]>(rows);

  const { data, loading, error } = useQuery(QUERY_SERVICES);
  // console.log({ data, loading, error });

  return (
    <main className="mt-10">
      <p className="text-center text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight uppercase mb-5 sm:mb-8 font-sans font-bold texrt-light-900">
        Defi Health Service
      </p>
      <div className="max-w-3xl relative overflow-x-auto shadow-md mx-auto">
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
            { index: 1, label: 'Chains' },
          ]}
        />
        <table className="max-w-full sm:w-7xl text-sm sm:text-xl text-left text-gray-500 dark:text-gray-400 mx-auto border-gray-800 border-b border-l border-r border-gray-500">
          <thead className="text-xs font-500 text-gray-700 uppercase bg-gray-50 dark:bg-transparent dark:text-gray-300 rounded-full text-sm p-8">
            <tr className="">
              <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3">
                name
              </th>
              <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3">
                updated at
              </th>
              <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 ">
                status
              </th>
              <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 max-w-28">
                Update
              </th>
            </tr>
          </thead>
          <tbody className="rounded-lg sm:rounded-lg">
            {filteredRows?.map(({ id, name, is_healthy, updated_at, created_at }, index) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-dark-600 dark:border-gray-700 hover:bg-light-50 dark:hover:bg-dark-100 selection:dark:text-white"
                  key={index}
                >
                  <td
                    scope="row"
                    className="px-3 sm:px-6 py-2 sm:py-4 font-600 text-gray-900 dark:text-light-900 whitespace-nowrap sm:tracking-wide"
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
                    {dateToNumeric(updated_at)}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 place-self-start self-start">
                    {is_healthy ? (
                      <Badge text="healthy" color="green" />
                    ) : (
                      <Badge text="unhealthy" color="red" />
                    )}
                  </td>
                  <td className="px-3 sm:px-6 py-2 sm:py-4 max-w-2 text-left">
                    <ToggleSwitch
                      on={is_healthy}

                      // onToggle={async event => {
                      // event.preventDefault();
                      // console.log('toggle', event.target.checked);
                      // const response = await fetch('/api/update-bridge-status', {
                      //   method: 'POST',
                      //   body: JSON.stringify({ service_id: id, operation: is_healthy ? 'disable' : 'enable' }),
                      // });
                      // const { status, error } = await response.json();
                      // console.log(status, error);
                      // }}
                    />
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

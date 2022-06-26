import Link from 'next/link';
import * as React from 'react';
import dynamic from 'next/dynamic';
import { useQuery } from 'graphql-hooks';
import type { GetStaticProps } from 'next';
import { Tabs } from '@/components/tabs';
import { Badge } from '@/components/badge';
import { dateToNumeric } from '@/lib/utilities';
import { SearchBar } from '@/components/search-bar';
import type { ServiceSchema } from '@/lib/schema.zod';
import { useRowsFilter } from '@/hooks/use-filter-rows';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { ToggleSwitch } from '@/components/toggle-switch';
import { initializeGraphQL, graphQLRequest, SERVICES_QUERY } from '@/lib/graphql';

export const getStaticProps: GetStaticProps = async () => {
  const client = initializeGraphQL();
  await graphQLRequest({ client, query: SERVICES_QUERY, options: {} });

  return {
    props: { initializeGraphQLState: client.cache?.getInitialState() },
    revalidate: 1,
  };
};

export default function Home(props: { initializeGraphQLState?: object }) {
  const { data, loading, error } = useQuery<{ Services: Array<ServiceSchema> }>(SERVICES_QUERY);

  const [selectedTab, setSelectedTab] = React.useState(0);

  const [filteredRows, onSearch, setText] = useRowsFilter(
    [data?.Services][selectedTab] as Array<ServiceSchema>
  );

  const isMounted = useIsMounted();
  if (!isMounted) return null;
  return (
    <main className="mt-10">
      <p className="text-center text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight uppercase mb-5 sm:mb-8 font-bold texrt-light-900 font-serif">
        Defi Health Service
      </p>
      <div className="max-w-3xl relative overflow-x-auto mx-auto">
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
        <table className="max-w-full sm:w-7xl text-sm sm:text-lg text-left text-gray-500 dark:text-gray-400 mx-auto border-3 border-t-transparent border-dark-100 border-b border-l border-r">
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
            {filteredRows?.map(
              (
                { id, name, health_status, updated_at, created_at, chain_id, contract_address },
                index
              ) => {
                if (!name) return null;
                const healthy = health_status === 'healthy';
                return (
                  <tr
                    className="bg-white border-b dark:bg-dark-600 dark:border-gray-700 hover:bg-light-50 dark:hover:bg-dark-100 selection:dark:text-white"
                    key={index}
                  >
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
                      {updated_at && dateToNumeric(updated_at)}
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 place-self-start self-start">
                      {healthy ? (
                        <Badge text="healthy" color="green" />
                      ) : (
                        <Badge text="unhealthy" color="red" />
                      )}
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 max-w-2 text-left">
                      <ToggleSwitch
                        on={healthy}

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
              }
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

import * as React from 'react';
import { GraphQLClient } from 'graphql-hooks';
import memCache from 'graphql-hooks-memcache';
import fetch from 'isomorphic-unfetch';
import { HASURA_ENDPINTS } from './constants';

let graphQLClient: GraphQLClient;

function createClient(initialState: object) {
  return new GraphQLClient({
    ssrMode: typeof window === 'undefined',
    url: `${process.env.NEXT_PUBLIC_HASURA_ENDPOINT}/v1/graphql`,
    headers: { 'X-Hasura-Admin-Secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET },
    cache: memCache({ initialState }),
    fetch,
  });
}

export function initializeGraphQL(initialState: object = {}) {
  const _graphQLClient = graphQLClient ?? createClient(initialState);
  if (initialState && graphQLClient) {
    graphQLClient.cache = memCache({
      // TODO: figure out types
      initialState: Object.assign((graphQLClient as any).cache.getInitialState(), initialState),
    });
  }

  if (typeof window !== 'undefined') return _graphQLClient;
  if (!graphQLClient) graphQLClient = _graphQLClient;
  return _graphQLClient;
}

export function useGraphQLClient(initialState: object) {
  const store = React.useMemo(() => initializeGraphQL(initialState), [initialState]);
  return store;
}

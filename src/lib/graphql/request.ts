import type { GraphQLClient, Operation, UseClientRequestOptions } from 'graphql-hooks';

const DEFAULT_OPTIONS = { useCache: true };

export async function graphQLRequest({
  client,
  query,
  options,
}: {
  client: GraphQLClient;
  query: string | null;
  options: UseClientRequestOptions;
}) {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  const operation = {
    query,
    variables: opts.variables,
    operationName: opts.operationName,
    persisted: opts.persisted,
  };

  if (opts.persisted || (client.useGETForQueries && !opts.isMutation)) {
    opts.fetchOptionsOverrides = { ...opts.fetchOptionsOverrides, method: 'GET' };
  }
  const cacheKey = client.getCacheKey(operation as Operation);

  const cacheValue = await client.request(operation as Operation, opts.fetchOptionsOverrides);

  client.saveCache(cacheKey, cacheValue);
  return cacheValue;
}

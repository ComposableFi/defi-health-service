export const NEW_SERVICE_MUTATION = `#graphql
  mutation (
    $name: String!,
    $chain_id: numeric!,
    $webhook_url: String!,
    $health_status: String!
    $contract_address: String!,
  ) {
  insert_Services(objects: {
    name: $name,
    chain_id: $chain_id,
    webhook_url: $webhook_url,
    health_status: $health_status
    contract_address: $contract_address,
  }) {
    returning {
      id
      name
      chain_id
      created_at
      webhook_url
      health_status
      contract_address
    }
  }
}
`;